import React, { Component } from "react";
import { View, Image, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  state = {}

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
          style={{
            width: 400,
            height: 200,
            resizeMode: 'cover'
          }}
          source={require('../assets/images/logo.png')} />

        <Text>
          Restaurant ID
        </Text>

        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="Enter restaurant ID"
          returnKeyLabel={"next"}
          onChangeText={(text) => this.setState({ id: text })}
        />

        <Button
          title="Sign in"
          onPress={() => {
            console.log(this.state.id);
            this.props.signIn(this.state.id);
          }} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
