import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import t from "tcomb-form-native";

let Form = t.form.Form;

class LoginScreen extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    let value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.props.signIn(value.restaurant_id);
    }
  }

  render() {
    let loginModel = t.struct({
      restaurant_id: t.Number,
      restaurant_pw: t.String,
    });

    let options = {
      fields: {
        restaurant_id: {
          label: "Restaurant ID",
        },
        restaurant_pw: {
          label: "Restaurant Password",
          password: true,
          secureTextEntry: true,
        },
      },
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 400,
            height: 200,
            resizeMode: "cover",
          }}
          source={require("../assets/images/logo.png")}
        />

        <View>
          <Form ref="form" type={loginModel} options={options} />
          <TouchableOpacity style={styles.button} onPress={this.submitForm}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: "SIGN_IN", payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
