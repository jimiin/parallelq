import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

class SalesCard extends React.Component {
  orderTime = (orderTime) => {
    const dateTime = orderTime.split("T");
    const date = dateTime[0];
    const time = dateTime[1].split(".")[0];
    return (
      <Text style={styles.optionText}>Ordered: {date + " at " + time}</Text>
    );
  };

  printRequirements() {
    if (this.props.order.hasOwnProperty("special_request")) {
      return (
        <Text style={[styles.itemNameText, { color: "red" }]}>
          {"Special requirements: " + this.props.order.special_request}
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.orderTitle}>Order #{this.props.order._id}</Text>
          {this.printRequirements()}
          <Text style={styles.itemNameText}>{this.props.order.items}</Text>
          <Text style={styles.itemNameText}>
            £{this.props.order.total_price}
          </Text>
          <Text>{this.orderTime(this.props.order.createdAt)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor: "grey",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
  },
  optionTextContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  orderTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "300",
  },
  itemNameText: {
    fontSize: 17.5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
});

export default SalesCard;
