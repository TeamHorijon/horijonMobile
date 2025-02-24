import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebViewPage from '../pages/WebViewPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomePage = () => <WebViewPage route={{ params: { url: 'https://horijon.org/arena' } }} />;
const InboxPage = () => <WebViewPage route={{ params: { url: 'https://inbox.url' } }} />;
const CreatePage = () => <WebViewPage route={{ params: { url: 'https://create.url' } }} />;
const ArtistsPage = () => <WebViewPage route={{ params: { url: 'https://horijon.org/biography' } }} />;
const ProfilePage = () => <WebViewPage route={{ params: { url: 'https://profile.url' } }} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

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
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Inbox" component={InboxPage} />
      <Tab.Screen name="Create" component={CreatePage} />
      <Tab.Screen name="Artists" component={ArtistsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="WebViewPage" component={WebViewPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;