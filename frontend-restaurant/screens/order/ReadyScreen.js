import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { styles } from "../../styles/styles";
import axios from "axios";

import OrderCardReady from "../../components/OrderCardReady";

class ReadyScreen extends Component {
  state = {
    orderCards: [],
  };

  updateOrders = () => {
    axios
      .get(
        "https://drp38-backend.herokuapp.com/orders/restaurant_status/" +
          this.props.id +
          "/prepared"
      )
      .then((res) => {
        const orders = res.data;
        var newOrders = [];
        for (let i = 0; i < orders.length; i++) {
          var order = orders[i];
          newOrders.push(<OrderCardReady key={order._id} order={order} />);
        }

        this.setState({
          orderCards: newOrders,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {this.state.orderCards}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: "SIGN_IN", payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);
