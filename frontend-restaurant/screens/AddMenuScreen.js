import React, { Component } from 'react';
import { View, 
         TouchableOpacity, 
         ToastAndroid, 
         StyleSheet, 
         Text 
       } from 'react-native';
import  t  from  'tcomb-form-native'
const axios = require('axios');

let  Form = t.form.Form
class AddMenuScreen extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this)
  }

  async submitForm() {
    var value = this.refs.form.getValue();

    if (value) {
      // if validation fails, value will be null
      try {
        let res = await axios.post('drp38-backend.herokuapp.com/items/add', value);
        ToastAndroid.show('Item Added to Menu', ToastAndroid.SHORT);
      } catch {
        ToastAndroid.show(value.name + ' ' + value.price + ' ' + value.description + ' ' + value.restaurant_id, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Item Failed to Add', ToastAndroid.SHORT);
    }
  }

  render() {
    let MenuItemModel = t.struct({
      name: t.String,             
      price: t.Number,            
      description: t.String,      
      restaurant_id: t.String,    
    });

    return (
      <View>
       <Form
         ref='form'
         type={MenuItemModel}
         // options={{}}
         // value={{}}
         // onChange={{}}
       />
       <TouchableOpacity style={styles.button} onPress={this.submitForm}>
          <Text style={styles.buttonText}>Submit</Text>
       </TouchableOpacity>
      </View>
      
    )
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

export default AddMenuScreen;