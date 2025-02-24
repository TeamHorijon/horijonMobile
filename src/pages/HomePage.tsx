import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InboxPage = () => {
  return (
    <View style={styles.container}>
      <Text>Inbox Page</Text>
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

export default InboxPage;