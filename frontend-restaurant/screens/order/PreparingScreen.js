import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
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
        const orderIds = orders.map((order) => order.id);
        var newOrders = [];

        for (let i = 0; i < orderIds.length; i++) {
          var order = orders[i];
          newOrders.push(
            <OrderCard key={order._id} id={order._id} items={order.items} uid={order.user_id} rid={order.restaurant_id}/>
          );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionTextContainer: {
    marginTop: 10,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    textAlign: "left",
  },
  description: {
    height: 0,
    flexWrap: "wrap",
    color: "transparent",
  },
  title: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 2,
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  active: {
    backgroundColor: "white",
  },
  inactive: {
    backgroundColor: "#f8f8f8",
    paddingBottom: 20,
  },
});

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
