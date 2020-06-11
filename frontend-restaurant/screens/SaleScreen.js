import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

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

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
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