import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArtistsPage = () => {
  return (
    <View style={styles.container}>
      <Text>Artists Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArtistsPage;