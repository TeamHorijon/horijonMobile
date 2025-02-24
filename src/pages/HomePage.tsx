// HomePage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@components/BottomTabNavigator';

const HomePage = () => {
  const navigation = useNavigation();

  const openWebView = () => {
    navigation.navigate(ROUTES.WEBVIEW, {
      url: 'https://horijon.org/arena'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <TouchableOpacity style={styles.button} onPress={openWebView}>
        <Text style={styles.buttonText}>Open Web Content</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomePage;
