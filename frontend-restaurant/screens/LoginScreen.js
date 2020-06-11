import React, { Component } from "react";
import { View, Image, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  state = {}

  render() {
    let loginModel = t.struct({
      restaurant_id: t.Number,
    });

    let options = {
      fields: {
        restaurant_id: {
          label: 'Restaurant Id',
          help: 'Please enter the id assigned to you',
        },
      },
    };

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

        <View>
          <Form
            ref='form'
            type={MenuItemModel}
           options={{options}}
          // value={{}}
          // onChange={{}}
          />
          <TouchableOpacity style={styles.button} onPress={() => {
            console.log(this.state.id);
            this.props.signIn(this.state.id);
          }} >
             <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

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
