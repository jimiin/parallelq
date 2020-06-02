import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function RestaurantScreen({ navigation, route }) {
  return (
    <View>
      <Text> Hello world </Text>
      <Button
        title='Order'
        // TODO : make an order
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
