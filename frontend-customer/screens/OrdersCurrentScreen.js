import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { styles } from "../styles/styles";
import { urlList } from "../constants/api";
import OrderCard from "../components/OrderCard";

class OrdersCurrentScreen extends React.Component {
  state = {};

  componentDidMount() {
    this.updateOrders();
    this.updateInterval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  resolveCancel = async (id) => {
    console.log(urlList.changeOrderStatus + "cancelled_resolved/" + id);
    try {
      let res = await axios.post(
        urlList.changeOrderStatus + "cancelled_resolved/" + id
      );
    } catch (err) {
      console.log(err);
    }
  };

  updateOrders = () => {
    if (this.props.user) {
      // Set Prepared Orders
      axios
        .get(urlList.orders + this.props.user.id + "/prepared")
        .then((res) => {
          const orders = res.data;
          this.setState({
            preparedOrders: orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                icon={"md-checkbox-outline"}
                status={1}
              />
            )),
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // Set Preparing Orders
      axios
        .get(urlList.orders + this.props.user.id + "/preparing")
        .then((res) => {
          const orders = res.data;
          this.setState({
            preparingOrders: orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                icon={"md-time"}
                status={0}
              />
            )),
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // Set Cancelled Orders
      axios
        .get(urlList.orders + this.props.user.id + "/cancelled")
        .then((res) => {
          const orders = res.data;
          this.setState({
            cancelledOrders: orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                icon={"md-close-circle-outline"}
                status={-1}
                onPress={(id) => {
                  alert("This order has been cancelled");
                  this.resolveCancel(id);
                }}
              />
            )),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.optionTextContainer}>
          <Text style={{ fontSize: 20 }}>Prepared orders:</Text>
        </View>
        {this.state.preparedOrders}
        <View style={styles.optionTextContainer}>
          <Text style={{ fontSize: 20 }}>Preparing orders:</Text>
        </View>
        {this.state.cancelledOrders}
        {this.state.preparingOrders}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(OrdersCurrentScreen);
