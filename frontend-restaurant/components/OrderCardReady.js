import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

class OrderCardReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.changeText = this.changeText.bind(this);
  }

  changeText() {
    const previous = this.state.isActive;
    this.setState({ isActive: !previous });
  }

  /* Sets order to prepared and deletes from the list. */
  onHandleDelete = async () => {
    try {
      let res = await axios.post(
        "https://drp38-backend.herokuapp.com/orders/change_status/past/" +
          this.props.order._id
      );
    } catch (err) {
      console.log(err);
    }
  };

  printRequirements() {
    if (this.props.order.hasOwnProperty("special_request")) {
      return (
        <Text
          style={[
            this.state.isActive
              ? [styles.content, styles.active]
              : { height: 0 },
            { color: "red" },
          ]}
        >
          {"Special requirements: " + this.props.order.special_request + "\n\n"}
        </Text>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10, margin: 10 }}
        onPress={this.changeText}
      >
        <View>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>#{this.props.order._id}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.viewItems]}>
                  {this.state.isActive ? "Hide Items" : "View Items"}
                </Text>
                <Icon
                  name={
                    this.state.isActive
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={30}
                  color={"black"}
                />
              </View>
            </View>

            <View style={styles.rightContainer}>
              <Button title="PICKED UP" onPress={this.onHandleDelete}></Button>
            </View>
          </View>

          <View>
            <Text
              style={
                this.state.isActive
                  ? [styles.content, styles.active]
                  : { height: 0 }
              }
            >
              {this.printRequirements()}
              <Text>{this.props.order.items}</Text>
            </Text>

            <View style={styles.inactive}></View>
          </View>
          <View
            style={this.state.isActive ? styles.active : styles.inactive}
          ></View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default OrderCardReady;
