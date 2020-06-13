import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';


import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';

class OrderCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    }
    this.changeText = this.changeText.bind(this);
  }

  

  changeText() {
    const previous = this.state.isActive;
    this.setState({isActive: (!previous)});
  }

   /* Sets order to prepared and deletes from the list. */
   onHandleReady = async () => {
    try {
      console.log('got here')
      await axios.post('https://drp38-backend.herokuapp.com/orders/change_status/prepared/' + this.props.id);
      // Post notification
      let restaurantName = (await axios.get('https://drp38-backend.herokuapp.com/restaurants/' + this.props.rid)).data.name;
      console.log(restaurantName);
      console.log(this.props.uid);
      let res = await axios.post(
        'https://drp38-backend.herokuapp.com/notifications/notify/user/', 
        {
          title: "Order ready to pick up!",
          body: "Your order from "+restaurantName+" is ready to pick up!",
          user_id: this.props.uid
        });
        console.log(res);
    } catch (err) {
      console.log(err)
    }
  };

  /* Cancels order and deletes from the list. */
  onHandleCancel = async () => {
    try {
      let res = await axios.post('https://drp38-backend.herokuapp.com/orders/change_status/cancelled/' + this.props.id);
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10, margin: 10 }}
        onPress={this.changeText} >
         <View>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Button
              title='Cancel'
              color='#fa8072'
              onPress={this.onHandleCancel}>
            </Button>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>#{this.props.id}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.viewItems]}>{this.state.isActive ?  'Hide Items': 'View Items'}</Text>
              <Icon name={this.state.isActive ? 'keyboard-arrow-up': 'keyboard-arrow-down' } size={30} color={'black'} />
            </View>
          </View>

          <View style={styles.rightContainer}>
            <Button
              title='Prepared'
              color='#96cdff'
              onPress={this.onHandleReady}>
            </Button>
          </View>
        </View>
        
        
        
        <View>
          <Text style={this.state.isActive ? [styles.content, styles.active] : {height:0}}>
            {this.props.items}
          </Text>

        <View style={styles.inactive}>
        </View>
      </View>
      <View style={this.state.isActive ? styles.active : styles.inactive}></View>


      </View>
      </ TouchableOpacity>
    );
  }
}

export default OrderCard;
