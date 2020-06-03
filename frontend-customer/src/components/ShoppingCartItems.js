import React, { Component } from "react";
import { ScrollView, View, Button } from "react-native";

import { styles } from '../styles/styles';

class ShoppingCartItems extends Component {
  renderItems = (items) => {
    return items.map(
      (item, index) => {
        return (
          <View key={index} style={{ padding: 20 }}>
            <Button
              title={item.name + " - " + item.price}
              onPress={() => this.props.onPress(item)} />
          </View>
        )
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderItems(this.props.items)}
      </ScrollView>
    );
  }
}

export default ShoppingCartItems;
