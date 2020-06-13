import * as React from "react";
import { Image, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "../styles/styles";

export default function RestaurantCard({ img, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "column" }}>
        <Image style={styles.fitImage} source={img} />
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </RectButton>
  );
}
