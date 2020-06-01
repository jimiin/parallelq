import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';

export default function OrdersScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OrderCard
        orderNumber="1"
        item="Katsu Curry"
        onPress={() => navigation.navigate('Restaurant')}
      />
      <OrderCard
        orderNumber="2"
        item="Katsu Curry"
        onPress={() => navigation.navigate('Restaurant')}
      />
    </ScrollView>
  );
}
