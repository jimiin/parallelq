import * as WebBrowser from 'expo-web-browser';
import React, { Component } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
const axios = require('axios');

class SaleScreen extends Component {
  async totalSales() {
    let res = await axios.get('https://drp38-backend.herokuapp.com/orders/restaurant_status/' + this.props.id + '/past')
    if (!res) {
      return 0;
    }
    let sales = res.data.map(order => order.price)
    const reducer = (acc, val) => acc + val;
    let totalSales = sales.reduce(reducer, 0)
    return totalSales;
  }

  render() {
    this.totalSales().then(
      res => {
        return (
          <View>
            <Text>
              Total: {res}
            </Text>
          </View>
        );
      }
    )
    return (
      <View>
        <Text>
          Total: 0
        </Text>
      </View>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
};

export default connect(mapStateToProps)(SaleScreen);