import React, { Component } from "react";
import { View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';

import { styles } from '../src/styles/styles';

class LoginScreen extends Component {
  state = {}

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '302399817797-0u74s0rbvcrmapn413h3fp703g98i91h.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    // this.setState({ user });
    this.props.signIn(user);
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    // this.setState({ user: null });
    this.props.singOut();
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  onPress = () => {
    if (this.props.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.logoImage}
          source={require('../assets/images/logo.png')} />

        <Button
          title="Sign in With Google"
          onPress={this.onPress} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
    singOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
//export default LoginScreen;
