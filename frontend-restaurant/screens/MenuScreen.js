import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import { styles } from "../styles/styles";
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
        var newItems = [];
        for (let i = 0; i < items.length; i++) {
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.state.menuCards}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(MenuScreen);
