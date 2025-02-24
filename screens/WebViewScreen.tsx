import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

const WebViewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://horijon.org' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;