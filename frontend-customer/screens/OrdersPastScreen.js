import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import axios from "axios";
import { styles } from "../styles/styles";
import { urlList } from "../constants/api";
import OrderCard from "../components/OrderCard";

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
        order={order}
        icon={"md-restaurant"}
        status={2}
      />
    );
  }

  cancelledResolvedOrder(order) {
    return (
      <OrderCard
        key={order._id}
        order={order}
        icon={"md-close-circle-outline"}
        status={-1}
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
