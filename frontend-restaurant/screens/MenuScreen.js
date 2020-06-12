import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { connect } from "react-redux";

import MenuCard from "../components/MenuCard";

class MenuScreen extends Component {
  state = {
    menuCards: [],
  };

  updateOrders = () => {
    axios
      .get("https://drp38-backend.herokuapp.com/items/" + this.props.id)
      .then((res) => {
        const items = res.data;
        const itemIds = items.map((item) => item.id);
        var newItems = [];
        for (let i = 0; i < itemIds.length; i++) {
          var item = items[i];
          newItems.push(
            <MenuCard
              key={item._id}
              itemNumber={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              availability={item.availability}
              onPressEdit={(id, name, price, desc) =>
                this.props.navigation.navigate("Edit Menu", {
                  id: id,
                  name: name,
                  price: price,
                  description: desc,
                })
              }
            />
          );
        }

        this.setState({
          menuCards: newItems,
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
      <ScrollView style={styles.container}>{this.state.menuCards}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: -15,
  },
});

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(MenuScreen);
