import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatePage = () => {
  return (
    <View style={styles.container}>
      <Text>Create Page</Text>
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

export default CreatePage;