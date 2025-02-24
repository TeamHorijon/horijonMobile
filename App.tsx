import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Define tab data with TypeScript interface
interface Tab {
  id: string;
  label: string;
  url: string;
}

// Array of tab data
const TABS: Tab[] = [
  { id: 'home', label: 'Home', url: 'https://example.com/home' },
  { id: 'inbox', label: 'Inbox', url: 'https://example.com/inbox' },
  { id: 'create', label: 'Create', url: 'https://example.com/create' },
  { id: 'artist', label: 'Artist', url: 'https://example.com/artist' },
  { id: 'profile', label: 'Profile', url: 'https://example.com/profile' },
];

export default function App() {
  // State for handling starting page visibility
  const [showStartingPage, setShowStartingPage] = useState<boolean>(true);
  
  // State for the current tab/URL
  const [currentTabId, setCurrentTabId] = useState<string>('home');
  
  // Animation for navbar
  const navbarAnimation = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Get current URL
  const currentUrl = TABS.find(tab => tab.id === currentTabId)?.url || TABS[0].url;
  
  // Handler for exiting the starting page
  const handleExitStartingPage = (): void => {
    setShowStartingPage(false);
  };
  
  // Function to handle WebView scroll events
  const handleWebViewScroll = (event: WebViewMessageEvent): void => {
    try {
      const scrollY = parseFloat(event.nativeEvent.data);
      
      if (isNaN(scrollY)) return;
      
      if (scrollY <= 0) {
        // At the top of the scroll, always show navbar
        Animated.spring(navbarAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      } else if (scrollY > lastScrollY.current) {
        // Scrolling down, hide navbar
        Animated.spring(navbarAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        // Scrolling up, show navbar
        Animated.spring(navbarAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
      
      // Update last scroll position
      lastScrollY.current = scrollY;
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set new timeout to show navbar when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        Animated.spring(navbarAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }, 200);
    } catch (error) {
      console.error('Error handling scroll message:', error);
    }
  };
  
  // JavaScript to inject into WebView to track scrolling
  const INJECT_SCROLL_LISTENER = `
    window.addEventListener('scroll', function() {
      window.ReactNativeWebView.postMessage(window.scrollY.toString());
    });
    true;
  `;
  
  // If showing starting page
  if (showStartingPage) {
    return (
      <View style={styles.startingContainer}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>MyApp</Text>
          </View>
          <Text style={styles.title}>Welcome to MyApp</Text>
          <Text style={styles.subtitle}>
            Your new favorite app for discovering artists and content
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleExitStartingPage}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Transparent overlay to detect touch anywhere */}
        <TouchableOpacity
          style={styles.overlay}
          onPress={handleExitStartingPage}
          activeOpacity={1}
        />
      </View>
    );
  }
  
  // Main app view with WebView and navbar
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: currentUrl }}
            style={styles.webView}
            injectedJavaScript={INJECT_SCROLL_LISTENER}
            onMessage={handleWebViewScroll}
          />
        </View>
        
        {/* Animated bottom navbar */}
        <Animated.View style={[
          styles.navbarWrapper,
          {
            transform: [{
              translateY: navbarAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 80], // Adjust this value based on your navbar height
              })
            }]
          }
        ]}>
          <SafeAreaView edges={['bottom']} style={styles.bottomNavContainer}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  currentTabId === tab.id && styles.activeTabButton
                ]}
                onPress={() => setCurrentTabId(tab.id)}
              >
                <Text 
                  style={[
                    styles.tabLabel,
                    currentTabId === tab.id && styles.activeTabLabel
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  
  // Bottom navbar
  navbarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTabButton: {
    borderTopWidth: 2,
    borderTopColor: '#4630EB',
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
  },
  activeTabLabel: {
    color: '#4630EB',
  },
  
  // Starting page styles
  startingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4630EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4630EB',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4630EB',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});