import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartingPage from '@pages/StartingPage';
import AppNavigator from '@components/BottomTabNavigator';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    // Logic to check if it's the first launch or the app is restarted
    // For simplicity, we are just using a state variable here
    setTimeout(() => {
      setIsFirstLaunch(false);
    }, 3000); // Display the starting page for 3 seconds
  }, []);

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <Stack.Navigator>
          <Stack.Screen 
            name="StartingPage" 
            component={StartingPage} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;