import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

import { styles } from "../styles/styles";
import OrderCard from "../components/OrderCard";
import { axios, urlList } from "../constants/api";

class OrderPastScreen extends React.Component {
  state = {};

  componentDidMount() {
    this.updateOrders();
    this.updateInterval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  compareOrder(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }

    if (a.createdAt > b.createdAt) {
      return -1;
    }

    return a._id - b._id;
  }

  pastOrder(order) {
    return (
      <OrderCard
        key={order._id}
        orderNumber={order._id}
        item={order.items}
        icon={"md-restaurant"}
        creationTime={order.createdAt}
        status={2}
        totalPrice={order.total_price}
        restaurantId={order.restaurant_id}
      />
    );
  }

  cancelledResolvedOrder(order) {
    return (
      <OrderCard
        key={order._id}
        orderNumber={order._id}
        icon={"md-close-circle-outline"}
        item={order.items}
        creationTime={order.createdAt}
        status={-1}
        totalPrice={order.total_price}
        restaurantId={order.restaurant_id}
      />
    );
  }

  updateOrders = () => {
    if (this.props.user) {
      axios
        .get(urlList.orders + this.props.user.id + "/past")
        .then((res) => {
          let data = res.data;

          axios
            .get(urlList.orders + this.props.user.id + "/cancelled_resolved")
            .then((res) => {
              data = data.concat(res.data).sort(this.compareOrder);

              this.setState({
                Orders: data.map((order) => {
                  if (order.status === "past") {
                    return this.pastOrder(order);
                  } else {
                    return this.cancelledResolvedOrder(order);
                  }
                }),
              });
            })
            .catch((err) => {
              console.log(err);
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
        {this.state.Orders}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(OrderPastScreen);
