import * as React from "react";
import { View, Text, ToastAndroid, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import ShoppingCartItems from "../components/ShoppingCartItems";
import { axios, urlList } from "../constants/api";
import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";

class ShoppingCartScreen extends React.Component {
  makeOrders = async () => {
    let order = "";
    this.props.itemCount
      .filter((i) => i.count > 0)
      .map((i) => {
        order += i.item.name + " x" + i.count + "\n";
      });

    if (order !== "") {
      try {
        const exampleItem = this.props.itemCount[0].item;

        let res = await axios.post(urlList.makeOrder, {
          items: order.substring(0, order.length - 1),
          restaurant_id: exampleItem.restaurant_id,
          user_id: this.props.user.id,
          total_price: this.totalPrice(),
        });

        ToastAndroid.showWithGravity(
          "Successfully ordered! View in Orders Tab",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        this.props.resetCart();
      } catch (e) {
        ToastAndroid.showWithGravity(
          "Error occured ",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        console.log("Error: " + e);
      }
    } else {
      ToastAndroid.showWithGravity(
        "Invalid Order",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  totalPrice = () => {
    let prices = this.props.itemCount.map((i) => i.item.price * i.count);
    const reducer = (acc, val) => acc + val;
    return prices.reduce(reducer, 0);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.itemCount.length > 0 ? (
          <ShoppingCartItems
            key={this.props.itemCount}
            onPressPlus={this.props.incItem}
            onPressMinus={this.props.decItem}
            onPressRemove={this.props.removeItemFromCart}
            itemCount={this.props.itemCount}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your Cart is empty!</Text>
          </View>
        )}
        <Text style={{ fontSize: 20 }}>
          Total: {formatter.format(this.totalPrice())}
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#1E90FF", padding: 20 }}
            onPress={() => {
              this.makeOrders();
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
              ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cartItems.itemCount,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incItem: (item) => dispatch({ type: "INC_ITEM", payload: item }),
    decItem: (item) => dispatch({ type: "DEC_ITEM", payload: item }),
    removeItemFromCart: (item) =>
      dispatch({ type: "REMOVE_ITEM", payload: item }),
    resetCart: () => dispatch({ type: "RESET" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
