import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Text,
} from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";

const axios = require("axios");
let Form = t.form.Form;

class AddMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.records = [];

    this.submitForm = this.submitForm.bind(this);
    this.generateCategories = this.generateCategories.bind(this);

  }

  async submitForm() {
    var value = this.refs.form.getValue();

    if (value) {
      // if validation fails, value will be null
      let categoryId = -1;
      for (let i = 0; i < this.records.length; i++) {
        if (this.records[i].name == value.categories) {
          //changes category_id to be whatever the field name on the backend is
          categoryId = this.records[i].category_id;
        }
      }
      try {
        let res = await axios.post(
          "https://drp38-backend.herokuapp.com/items/add/",
          {
            name: value.name,
            price: value.price,
            description: value.description,
            restaurant_id: this.props.id,
            category_id: categoryId, // change the post call to make it work
          }
        );
        ToastAndroid.show("Item Added to Menu", ToastAndroid.SHORT);
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastAndroid.show("Item Failed to Add", ToastAndroid.SHORT);
    }
  }

  generateCategories() {
    // TODO: fill in the get
    axios.get("https://drp38-backend.herokuapp.com/categories" + this.props.id)
    .then(res => {
      var categoryRecords = res.data;
      this.records = categoryRecords;
      var categoryNames = categoryRecords.map(category => category.name);
      let obj = {};
      Object.assign(obj, categoryNames);
      return obj;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

  render() {
    let MenuItemModel = t.struct({
      name: t.String,
      price: t.Number,
      description: t.String,
      categories: t.enums(this.generateCategories(), 'Category'),
    });

    return (
      <View style={{ padding: 10 }}>
        <Form ref="form" type={MenuItemModel} />
        <TouchableOpacity style={styles.button} onPress={this.submitForm}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
