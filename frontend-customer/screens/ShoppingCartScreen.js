import * as React from "react";
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import ShoppingCartItems from "../components/ShoppingCartItems";
import { urlList } from "../constants/api";
import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";

class ShoppingCartScreen extends React.Component {
  state = {
    text: "",
  };

  makeOrders = async () => {
    let order = "";
    this.props.itemCount
      .filter((i) => i.count > 0)
      .map((i) => {
        order += i.item.name + " x" + i.count + "\n";
      });

    if (order !== "") {
      try {
        order = order.substring(0, order.length - 1);
        const exampleItem = this.props.itemCount[0].item;
        const specialRequest = this.state.text;

        if (specialRequest !== "") {
          let res = await axios.post(urlList.makeOrder, {
            items: order,
            restaurant_id: exampleItem.restaurant_id,
            user_id: this.props.user.id,
            total_price: this.totalPrice(),
            special_request: specialRequest,
          });
        } else {
          let res = await axios.post(urlList.makeOrder, {
            items: order,
            restaurant_id: exampleItem.restaurant_id,
            user_id: this.props.user.id,
            total_price: this.totalPrice(),
          });
        }

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

  setText = (requirements) => {
    this.setState({ text: requirements });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          {this.props.itemCount.length > 0 ? (
            <View style={{ flex: 1 }}>
              <ShoppingCartItems
                key={this.props.itemCount}
                onPressPlus={this.props.incItem}
                onPressMinus={this.props.decItem}
                onPressRemove={this.props.removeItemFromCart}
                itemCount={this.props.itemCount}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Cart is empty!</Text>
            </View>
          )}

          <View style={styles.bottomContainer}>
            <TextInput
              style={{
                padding: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
              placeholder="Add additional requirements (allergies, ...) here"
              onChangeText={(text) => this.setText(text)}
              defaultValue={this.state.text}
              multiline={true}
            />

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>Total:</Text>

              <View style={styles.rightContainer}>
                <Text style={{ fontSize: 20 }}>
                  {formatter.format(this.totalPrice())}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: "#1E90FF", padding: 20 }}
              onPress={() => {
                this.makeOrders();
              }}
            >
              <Text style={styles.orderbuttonText}>ORDER</Text>
            </TouchableOpacity>
          </View>
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
