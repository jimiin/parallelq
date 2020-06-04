import * as React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from '../styles/styles';

/* TODO: Add number of people in queue in case 2 */
const orderStatus = (prepared) => {
  switch(prepared) {
    case 0: return (<Text>Input Estimated Time Here</Text>)
    case 1: return (<Text>Pick Up Now</Text>)
    case 2:
    default: return (<Text></Text>)
  }
}

export default function OrderCard({ orderNumber, item, creationTime, prepared, onPress }) {
  return (
    <RectButton style={[(prepared == 1) ? styles.preparedRow : styles.preparingRow, onPress = { onPress }, {borderRadius:10, margin:10}]} >
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.title}>
          <Text style={styles.optionText}>Order #{orderNumber}</Text>
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Ordered at: {creationTime}</Text>
        </View>
      </View>
        {orderStatus(prepared)}
    </ RectButton>
  );
}
