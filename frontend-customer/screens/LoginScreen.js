import React, { Component } from "react";
import { View, Image, Button } from 'react-native';

import { styles } from '../src/styles/styles';

class LoginScreen extends Component {
  state = {}
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.logoImage}
          source={require('../assets/images/logo.png')} />

        <Button
          title="Sign in With Google"
          onPress={() => this.props.navigation.navigate('Root')} />
      </View>
    );
  }
}

export default LoginScreen;
