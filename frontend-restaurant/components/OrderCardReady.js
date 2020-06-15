import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';


import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';

class OrderCardReady extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
    this.changeText = this.changeText.bind(this);
  }

  

  changeText() {
    const previous = this.state.isActive;
    this.setState({isActive: (!previous)});
  }

  /* Sets order to prepared and deletes from the list. */
  onHandleDelete = async () => {
    try {
      let res = await axios.post('https://drp38-backend.herokuapp.com/orders/change_status/past/' + this.props.id);
    } catch (err) {
      console.log(err)
    }
  };

  printItems() {
    let splitText = this.props.items.split("\nSpecial requirements");
    return (
      <Text style={this.state.isActive ? [styles.content, styles.active] : {height:0}}>
        <Text style={this.state.isActive ? [styles.content, styles.active] : {height:0}, splitText[1] == undefined ? {fontSize:0} : {color:'red'}}>
          {"Special requirements" + splitText[1] + "\n\n"}
        </Text>
        {splitText[0]}
      </Text>
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10, margin: 10 }}
        onPress={this.changeText} >
         <View>
        <View style={styles.row}>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>#{this.props.id}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.viewItems]}>{this.state.isActive ?  'Hide Items': 'View Items'}</Text>
              <Icon name={this.state.isActive ? 'keyboard-arrow-up': 'keyboard-arrow-down' } size={30} color={'black'} />
            </View>
          </View>

          <View style={styles.rightContainer}>
            <Button
              title='PICKED UP'
              onPress={this.onHandleDelete}>
            </Button>
          </View>
        </View>
        
        
        
        <View>
          {this.printItems()}

        <View style={styles.inactive}>
        </View>
      </View>
      <View style={this.state.isActive ? styles.active : styles.inactive}></View>


      </View>
      </ TouchableOpacity>
    );
  }
}

export default OrderCardReady;
