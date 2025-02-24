import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebViewPage from '../pages/WebViewPage';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types
type RootStackParamList = {
  Main: undefined;
  WebViewPage: { url: string };
};

type TabParamList = {
  Home: undefined;
  Inbox: undefined;
  Create: undefined;
  Artists: undefined;
  Profile: undefined;
};

// Define WebViewPage props type
type WebViewPageProps = {
  route: {
    params: {
      url: string;
    };
  };
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Create wrapper components with proper navigation props
const HomePage: React.FC = () => <WebViewPage route={{ params: { url: 'https://horijon.org/arena' } }} />;
const InboxPage: React.FC = () => <WebViewPage route={{ params: { url: 'https://inbox.url' } }} />;
const CreatePage: React.FC = () => <WebViewPage route={{ params: { url: 'https://create.url' } }} />;
const ArtistsPage: React.FC = () => <WebViewPage route={{ params: { url: 'https://horijon.org/biography' } }} />;
const ProfilePage: React.FC = () => <WebViewPage route={{ params: { url: 'https://profile.url' } }} />;

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'ios-help-circle'; // Default fallback icon

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              break;
            case 'Inbox':
              iconName = focused ? 'ios-mail' : 'ios-mail-outline';
              break;
            case 'Create':
              iconName = focused ? 'ios-create' : 'ios-create-outline';
              break;
            case 'Artists':
              iconName = focused ? 'ios-people' : 'ios-people-outline';
              break;
            case 'Profile':
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;
            default:
              iconName = 'ios-help-circle'; // Ensure there's always a default
          }

          // Now iconName is guaranteed to be a string
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
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Inbox" component={InboxPage} />
      <Tab.Screen name="Create" component={CreatePage} />
      <Tab.Screen name="Artists" component={ArtistsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen 
        name="WebViewPage" 
        component={WebViewPage as React.ComponentType<any>} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;