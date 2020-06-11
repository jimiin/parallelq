import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import { connect } from 'react-redux';

import Icon from "react-native-vector-icons/MaterialIcons";
import MenuCard from '../components/MenuCard';

class MenuScreen extends Component {

  state = {
    menuCards: [],
  };

  updateOrders = () => {
    axios.get('https://drp38-backend.herokuapp.com/items/' + this.props.id)
      .then(res => {
        const orders = res.data;
        const orderIds = orders.map(order => order.id);
        var newOrders = [];
        for (let i = 0; i < orderIds.length; i++) {
          var order = orders[i];
          newOrders.push(
            <MenuCard
            key={order._id}
            itemNumber={order._id}
            name={order.name}
            price={order.price}
            description={order.description}
            availability={order.availability} />
          );
          
        }

        this.setState({
          menuCards: newOrders
        })
      })
      .catch(err => {
        console.log(err);
      });
  }


  componentDidMount() {
    this.interval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
     
        {this.state.menuCards}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: -15,
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
  },
  available: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#29cf53',
  },
  unavailable: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#d93030',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
};

export default connect(mapStateToProps)(MenuScreen);
