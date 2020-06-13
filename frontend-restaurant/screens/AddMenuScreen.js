import React, { Component } from "react";
import {
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";

const axios = require("axios");
let Form = t.form.Form;

class AddMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    }

    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm() {
    var value = this.refs.form.getValue();

    if (value) {
      // if validation fails, value will be null
      try {
        let res = await axios.post(
          "https://drp38-backend.herokuapp.com/items/add/",
          {
            name: value.name,
            price: value.price,
            description: value.description,
            restaurant_id: this.props.id,
          }
        );
        this.setState({value: null});
        ToastAndroid.show("Item Added to Menu", ToastAndroid.SHORT);
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastAndroid.show("Item Failed to Add", ToastAndroid.SHORT);
    }
  }

  render() {
    let MenuItemModel = t.struct({
      name: t.String,
      price: t.Number,
      description: t.String,
    });

    return (
      <ScrollView style={{ padding: 10 }}>
        <Form ref="form" type={MenuItemModel} value={this.state.value}/>
        <TouchableOpacity style={styles.button} onPress={this.submitForm}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
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

export default connect(mapStateToProps)(AddMenuScreen);
