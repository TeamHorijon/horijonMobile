// BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '@pages/HomePage';
import InboxPage from '@pages/InboxPage';
import CreatePage from '@pages/CreatePage';
import ArtistsPage from '@pages/ArtistsPage';
import ProfilePage from '@pages/ProfilePage';
import WebViewPage from '@pages/WebViewPage';
import { ROUTES } from '@components/routes';

// Create navigator instances
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'ios-help-circle'; // Default fallback icon

          switch (route.name) {
            case ROUTES.HOME:
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              break;
            case ROUTES.INBOX:
              iconName = focused ? 'ios-mail' : 'ios-mail-outline';
              break;
            case ROUTES.CREATE:
              iconName = focused ? 'ios-create' : 'ios-create-outline';
              break;
            case ROUTES.ARTISTS:
              iconName = focused ? 'ios-people' : 'ios-people-outline';
              break;
            case ROUTES.PROFILE:
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;
            default:
              iconName = 'ios-help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomePage} />
      <Tab.Screen name={ROUTES.INBOX} component={InboxPage} />
      <Tab.Screen name={ROUTES.CREATE} component={CreatePage} />
      <Tab.Screen name={ROUTES.ARTISTS} component={ArtistsPage} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfilePage} />
    </Tab.Navigator>
  );
};

// Main app navigator that includes both the tab navigator and any screens
// that should be accessible outside the tab structure
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name={ROUTES.WEBVIEW} 
        component={WebViewPage} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;