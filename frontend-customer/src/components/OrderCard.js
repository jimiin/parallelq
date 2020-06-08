import * as React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from '../styles/styles';

const ordinalSuffix = (queuePosition) => {
  const pos = queuePosition + 1
  const i = pos % 10
  const j = pos % 100;
  if (i == 1 && j != 11) {
    return pos + "st";
  }
  if (i == 2 && j != 12) {
    return pos + "nd";
  }
  if (i == 3 && j != 13) {
    return pos + "rd";
  }
  return pos + "th";
}

/* TODO: Add number of people in queue in case 2 */
const orderStatus = (prepared, queuePosition) => {
  switch (prepared) {
    case 0:
      return (
        <Text style={styles.orderTitle}>
          Position in queue: {ordinalSuffix(queuePosition)}
        </Text>
      )
    case 1:
      return (
        <Text style={styles.orderTitle}>
          Pick Up Now
        </Text>
      )
    case 2:
    default:
      return (<Text></Text>)
  }
}

const orderTime = (creationTime) => {
  const dateTime = creationTime.split('T')
  const date = dateTime[0];
  const time = (dateTime[1]).split('.')[0];
  return (
    <Text style={styles.optionText}>
      Ordered: {date + ' at ' + time}
    </Text>)
}

export default function OrderCard({ orderNumber, item, creationTime, prepared, queuePosition, onPress }) {
  return (
    <RectButton
      style={[(prepared == 1) ?
        styles.preparedRow :
        styles.preparingRow,
      onPress = { onPress },
      { borderRadius: 10, margin: 10 }]} >
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
            <View style={styles.title}>
              <Text style={styles.orderTitle}>
                Order #{orderNumber}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {orderStatus(prepared, queuePosition)}
          </View>
        </View>

        <Text style={styles.itemNameText}>{item}</Text>
        <View style={styles.optionTextContainer}>
          {orderTime(creationTime)}
        </View>
      </View>


    </ RectButton>
  );
}
