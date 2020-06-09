import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';

import { Provider } from 'react-redux'
import { store } from './src/store/index'

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

  var user = ''
  var data = ''

  React.useEffect(() => {
    user = AsyncStorage.getItem('user');
    if (user) {
      data = JSON.parse(user)
    }
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <AppNavigator userData={data} />
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
