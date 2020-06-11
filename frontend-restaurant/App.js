import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux'
import { store } from './reducers/index'

import "intl";
import "intl/locale-data/jsonp/en";

import useCachedResources from './hooks/useCachedResources';
import AppNavigator from './navigation/AppNavigator';

  

export default function App(props) {
  if (Platform.OS === "android") {
    if (typeof Intl.__disableRegExpRestore === "function") {
      Intl.__disableRegExpRestore();
    }
  }
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
