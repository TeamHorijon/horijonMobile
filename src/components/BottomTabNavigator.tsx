import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from './Icon';
import HomePage from '../pages/HomePage';
import InboxPage from '../pages/InboxPage';
import CreatePage from '../pages/CreatePage';
import ArtistsPage from '../pages/ArtistsPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

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

          return <Icon name={iconName} size={size} color={color} />;
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

export default BottomTabNavigator;