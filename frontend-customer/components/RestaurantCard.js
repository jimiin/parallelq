import * as React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { styles } from "../styles/styles";

export default function RestaurantCard({ img, label, queueSize, onPress }) {
  return (
    <TouchableOpacity style={styles.restaurantCard} onPress={onPress}>
      <View style={{ flexDirection: "column" }}>
        <Image style={styles.fitImage} source={img} />
        <View style={{ justifyContent: "space-between" }}>
          <Text style={styles.optionText}>{label}</Text>
          <Text style={queueSize != -1 ? styles.queueSizeText : { height: 0 }}>
            People in queue: {queueSize}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
