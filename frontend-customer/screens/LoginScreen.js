import React, { Component } from "react";
import { View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { axios } from '../src/backend-api/api';

import { styles } from '../src/styles/styles';

class LoginScreen extends Component {
  state = {}

  // componentDidMount() {
  //   this.initAsync();
  // }

  config = {
    androidClientId: `302399817797-0u74s0rbvcrmapn413h3fp703g98i91h.apps.googleusercontent.com`,
    androidStandaloneAppClientId: `302399817797-3hf5lo1ljogl5phng26t4803att42ia6.apps.googleusercontent.com`,
    scopes: ['profile', 'email']
  };

  signInWithGoogleAsync = async () => {
    console.log("About to log on!!!");
    try {
      // First- obtain access token from Expo's Google API
      const { type, accessToken, user } = await Google.logInAsync(this.config);
      this.props.signIn(user);
      console.log(type);
      console.log(user);
    } catch (e) {
      console.log("Error: " + e);
    }

    // if (type === 'success') {
    //   // Then you can use the Google REST API
    //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });
    // }

  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          style={styles.logoImage}
          source={require('../assets/images/logo.png')} />

        <Button
          title="Sign in With Google"
          onPress={() => {
            this.signInWithGoogleAsync();

          }} />
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
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
//export default LoginScreen;
