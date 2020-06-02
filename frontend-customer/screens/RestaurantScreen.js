import * as React from 'react';
import { View, Text, Button } from 'react-native';

const url = 'http://localhost:5000'
const axios = require('axios');

async function makeOrder() {
  const res = await axios.post(url + "/orders/add", {
    items: "Burger"
  });
}

export default function RestaurantScreen({ navigation, route }) {
  const title = route.params.title;

  navigation.setOptions(
    {
      headerTitle: title
    }
  );

  return (
    <View>
      <Text> This is {title} screen </Text>
      <Button
        title='Order'
        onPress={() => { makeOrder() }}
      />
    </View>
  );
}
