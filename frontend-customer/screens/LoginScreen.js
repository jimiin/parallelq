import React, { Component } from "react";
import { View, Image, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { axios, urlList } from '../src/backend-api/api';

import { styles } from '../src/styles/styles';

class LoginScreen extends Component {
  state = {
    isLoading: false
  }

  config = {
    androidClientId: `302399817797-0u74s0rbvcrmapn413h3fp703g98i91h.apps.googleusercontent.com`,
    androidStandaloneAppClientId: `302399817797-3hf5lo1ljogl5phng26t4803att42ia6.apps.googleusercontent.com`,
    scopes: ['profile', 'email']
  };

  signInWithGoogleAsync = async () => {
    console.log("About to log on!!!");
    this.setState({ isLoading: true })
    try {
      // First- obtain access token from Expo's Google API
      const { type, accessToken, user } = await Google.logInAsync(this.config);
      const res = await axios.post(urlList.verify, {
        name: user.name,
        email: user.email,
        gid: user.id
      })

      this.props.signIn(user);
      this.setState({ isLoading: false })
      console.log(type);
      console.log(user);
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  render() {
    return (
      this.state.isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
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
        )
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
