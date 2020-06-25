import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { styles } from "../../styles/styles";
import axios from "axios";

import OrderCard from "../../components/OrderCard";

class PreparingScreen extends Component {
  state = {
    orderCards: [],
  };

  updateOrders = () => {
    axios
      .get(
        "https://drp38-backend.herokuapp.com/orders/restaurant_status/" +
          this.props.id +
          "/preparing"
      )
      .then((res) => {
        const orders = res.data;
        var newOrders = [];
        for (let i = 0; i < orders.length; i++) {
          var order = orders[i];
          newOrders.push(<OrderCard key={order._id} order={order} />);
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
    signIn: (id) => dispatch({ type: "SIGN_IN", payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparingScreen);
