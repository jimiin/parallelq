import * as React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { axios, urlList } from "../constants/api";
import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";

class OrderCard extends React.Component {
  state = {};

  componentDidMount() {
    axios
      .get(urlList.restaurants + this.props.restaurantId)
      .then((res) => {
        this.setState({ restaurantName: res.data.name });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ordinalSuffix = (queuePosition) => {
    const pos = queuePosition + 1;
    const i = pos % 10;
    const j = pos % 100;
    if (i == 1 && j != 11) {
      return pos + "st";
    }
    if (i == 2 && j != 12) {
      return pos + "nd";
    }
    if (i == 3 && j != 13) {
      return pos + "rd";
    }
    return pos + "th";
  };

  orderStatus = (status, queuePosition) => {
    switch (status) {
      case 0:
        return (
          <Text style={styles.orderTitle}>
            Position in queue: {this.ordinalSuffix(queuePosition)}
          </Text>
        );
      case 1:
        return <Text style={styles.orderTitle}>Pick Up Now</Text>;
      case -1:
        return <Text style={styles.orderTitle}>Order cancelled</Text>;
      case 2:
      default:
        return <Text></Text>;
    }
  };

  orderTime = (creationTime) => {
    const dateTime = creationTime.split("T");
    const date = dateTime[0];
    const time = dateTime[1].split(".")[0];
    return (
      <Text style={styles.orderTimeText}>Ordered: {date + " at " + time}</Text>
    );
  };

  printItems() {
    let splitText = this.props.item.split("\nSpecial requirements");
    return (<View>
      <Text style={[styles.itemNameText, splitText[1] == undefined ? {fontSize:0} : {color:'red'}]}>
        {"Special requirements" + splitText[1]}
      </Text>
      <Text style={styles.itemNameText}>
        {splitText[0]}
      </Text>
    </View>);
  };

  render() {
    const buttonStyle =
      this.props.status === 1
        ? styles.preparedRow
        : this.props.status === -1
        ? styles.cancelledRow
        : styles.preparingRow;

    const onPress = this.props.onPress
      ? () => this.props.onPress(this.props.orderNumber)
      : () => console.log("hi");

    return (
      <RectButton style={buttonStyle} onPress={onPress}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons
                  name={this.props.icon}
                  size={30}
                  color="rgba(0,0,0,0.35)"
                />
              </View>
              <View style={styles.title}>
                <Text style={styles.orderTitle}>
                  Order #{this.props.orderNumber}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              {this.orderStatus(this.props.status, this.props.queuePosition)}
            </View>
          </View>

          <Text style={styles.orderTitle}>{this.state.restaurantName}</Text>
          {this.printItems()}
          <Text style={styles.itemNameText}>
            {formatter.format(this.props.totalPrice)}
          </Text>
          {this.orderTime(this.props.creationTime)}
        </View>
      </RectButton>
    );
  }
}

export default OrderCard;
