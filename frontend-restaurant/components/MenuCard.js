import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

class MenuCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      isAvailable: this.props.availability,
    };
    this.changeText = this.changeText.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  changeText() {
    const previous = this.state.isActive;
    this.setState({ isActive: !previous });
  }

  /* Sets order to prepared and deletes from the list. */
  handlePress = async () => {
    const prev = this.state.isAvailable;
    this.setState({
      isAvailable: prev == "available" ? "unavailable" : "available",
    });
    // try {
    //   console.log("about to do it");
    //   var request =
    //     "https://drp38-backend.herokuapp.com/items/change_availability/" +
    //     (this.props.availability == "available" ? "unavailable" : "available") +
    //     "/" +
    //     this.props.itemNumber;
    //   console.log(request);
    //   let res = await axios.post(request);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  render() {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10, margin: 10 }}
        onPress={this.changeText}
      >
        <View>
          <View style={styles.column}>
            <Text style={styles.title}>{this.props.name}</Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={
                    this.state.isAvailable == "available"
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {"Currently: " + this.state.isAvailable}
                </Text>
                <Text>{"Item ID: " + this.props.itemNumber}</Text>
                <Text>{"Price: " + formatter.format(this.props.price)}</Text>

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

              <View style={styles.rightContainer}>
                <View style={{ flexDirection: "column", padding: 5 }}>
                  <View style={{ padding: 2 }}>
                    <Button
                      title={
                        "Make " +
                        (this.state.isAvailable == "available"
                          ? "unavailable"
                          : "available")
                      }
                      onPress={this.handlePress}
                    />
                  </View>

                  <View style={{ padding: 2 }}>
                    <Button
                      title="Edit"
                      onPress={() =>
                        this.props.onPressEdit(
                          this.props.itemNumber,
                          this.props.name,
                          this.props.price,
                          this.props.description
                        )
                      }
                    />
                  </View>

                  <View style={{ padding: 2 }}>
                    <Button title="Remove" onPress={this.handlePress} />
                  </View>
                </View>
              </View>
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
              {"Description: " + this.props.description}
            </Text>
          </View>
          <View style={styles.inactive} />

          <View style={this.state.isActive ? styles.active : styles.inactive} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuCard;
