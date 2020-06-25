import React, { Component } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";

import SalesCard from "../components/SalesCard";
import axios from "axios";

class SaleScreen extends Component {
  state = {};

  componentDidMount() {
    this.updateOrders();
    this.updateInterval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateOrders = () => {
    axios
      .get(
        "https://drp38-backend.herokuapp.com/orders/restaurant_status/" +
          this.props.id +
          "/past"
      )
      .then((res) => {
        const orders = res.data;
        this.setState({
          Orders: orders.map((order) => (
            <SalesCard key={order._id} order={order} />
          )),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  totalPrice() {
    if (this.state.Orders) {
      const prices = this.state.Orders.map(
        (order) => order.props.order.total_price
      );
      const reducer = (acc, val) => acc + val;
      return prices.reduce(reducer, 0);
    }
    return 0;
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 20 }}>
            Total Sales: {formatter.format(this.totalPrice())}
          </Text>
        </View>
        {this.state.Orders}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(SaleScreen);
