import React, { Component } from "react";
import { ScrollView, View, Button } from "react-native";

import { styles } from '../styles/styles';

class Menus extends Component {
  renderMenus = (menus) => {
    return menus.map(
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
        {this.renderMenus(this.props.menus)}
      </ScrollView>
    );
  }
}

export default Menus;
