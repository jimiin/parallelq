import * as React from "react";
import { Image, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { styles } from "../styles/styles";

export default function RestaurantCard({ img, label, queueSize, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "column" }}>
        <Image style={styles.fitImage} source={img} />
        <View style={{justifyContent: "space-between"}}>
          <Text style={styles.optionText}>{label}</Text>
          <Text style={queueSize != -1 ? styles.optionText : {height:0}}>People in queue: {queueSize}</Text>
        </View>
        
      </View>
    </RectButton>
  );
}
