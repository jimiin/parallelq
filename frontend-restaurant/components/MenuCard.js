import * as React from "react";
import {
  View,
  Text,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { styles } from "../styles/styles";
import { formatter } from "../styles/formatter";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

class MenuCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
    this.changeText = this.changeText.bind(this);
  }

  changeText() {
    const previous = this.state.isActive;
    this.setState({ isActive: !previous });
  }

  /* Sets order to prepared and deletes from the list. */
  handleAvailability = async () => {
    try {
      var request =
        "https://drp38-backend.herokuapp.com/items/change_availability/" +
        (this.props.availability == "available" ? "unavailable" : "available") +
        "/" +
        this.props.itemNumber;
      let res = await axios.post(request);
    } catch (err) {
      console.log(err);
    }
  };

  handleRemove = async () => {
    try {
      let res = await axios.delete(
        "https://drp38-backend.herokuapp.com/items/delete/" +
          this.props.itemNumber
      );
      ToastAndroid.show("Item Removed", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Item Failed to be Removed", ToastAndroid.SHORT);
      console.log(e);
    }
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
                    this.props.availability == "available"
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {"Currently: " + this.props.availability}
                </Text>
                <Text style={styles.itemPropText}>
                  {"Item ID: " + this.props.itemNumber}
                </Text>
                <Text style={styles.itemPropText}>
                  {"Price: " + formatter.format(this.props.price)}
                </Text>

                <View style={styles.bottomContainer}>
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

              <View style={styles.menuButtonContainer}>
                <View style={{ flexDirection: "column", padding: 5 }}>
                  <View style={{ padding: 2 }}>
                    <Button
                      title={
                        "Make " +
                        (this.props.availability == "available"
                          ? "unavailable"
                          : "available")
                      }
                      onPress={this.handleAvailability}
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
                    <Button title="Remove" onPress={this.handleRemove} />
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
