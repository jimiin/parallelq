import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

class AccountProfile extends React.Component {
  state = {};

  componentDidMount() {
    const axios = require("axios");

    axios
      .get("https://drp38-backend.herokuapp.com/restaurants/" + this.props.id)
      .then((res) => {
        this.setState({ restaurantName: res.data.name });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{this.state.restaurantName}</Text>
        </View>

        <OptionButton
          icon="md-person"
          label={"Restaurant ID: " + this.props.id}
        />
        <OptionButton
          icon="md-log-out"
          label="Log out"
          onPress={this.props.onPressLogOut}
        />
      </View>
    );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={30} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginTop: 1,
  },
  nameContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default AccountProfile;
