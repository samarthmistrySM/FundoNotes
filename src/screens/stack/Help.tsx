import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';

const Help = () => {
  return (
    <WebView
      style={styles.container}
      source={{uri: 'https://support.google.com/keep'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Help;
