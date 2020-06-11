import React, { Component } from "react";
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { formatter } from '../styles/formatter';

import SalesCard from '../components/SalesCard'
const axios = require('axios');

class SaleScreen extends Component {
  state = {}

  componentDidMount() {
    this.updateOrders();
    this.updateInterval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateOrders = () => {
    axios.get('https://drp38-backend.herokuapp.com/orders/restaurant_status/' + this.props.id + '/past')
      .then(res => {
        const orders = res.data;
        this.setState({
          Orders: orders.map(order => (
            <SalesCard
              key={order._id}
              orderNumber={order._id}
              item={order.items}
              totalPrice={order.total_price}
              time={order.createdAt}
            />
          ))
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  totalPrice() {
    if (this.state.Orders) {
      const prices = this.state.Orders.map(order => order.props.totalPrice);
      const reducer = (acc, val) => acc + val;
    return prices.reduce(reducer, 0);
    }
    return 0;
  }

  render() {
    return (
      <ScrollView
       
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={{ fontSize: 20 }}>
          Total Sales: {formatter.format(this.totalPrice())}</Text>
        {this.state.Orders}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
})

export default connect(mapStateToProps)(SaleScreen);