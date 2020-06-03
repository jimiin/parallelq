import React, { Component } from "react";
import { ScrollView, View, Text, Button } from "react-native";

import { styles } from '../styles/styles';

class Menus extends Component {
  renderMenus = (menus) => {
    return menus.map(
      (item, index) => {
        return (
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.itemNameText}>{item.name}</Text>
              <Text style={styles.itemPriceText}>£{item.price}</Text>
            </View>
            <View key={index} style={{ padding: 10 }}>
              <Button
                title="Add to cart"
                onPress={() => this.props.onPress(item)} />
            </View>
          </View>
        )
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderMenus(this.props.menus)}
      </ScrollView>
    );
  }
}

export default Menus;
