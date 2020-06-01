import * as React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';

export default function OrderCard({ orderNumber, item, onPress }) {
  return (
    <RectButton style={onPress = { onPress }} >
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.contentContainer}>
          <Text style={styles.optionText}>{orderNumber}</Text>
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{item}</Text>
        </View>
      </View>
    </ RectButton>
  );
}
