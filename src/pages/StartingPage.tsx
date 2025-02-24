import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Horijon Mobile</Text>
      <Text style={styles.subtitle}>This is the starting page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default StartingPage;