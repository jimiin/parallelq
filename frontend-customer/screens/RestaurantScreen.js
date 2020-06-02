import * as React from 'react';
import { View, Text, Button } from 'react-native';

const url = 'http://localhost:5000'
const axios = require('axios');

async function makeOrder() {
  const res = await axios.post(url + "/orders/add", {
    items: "Burger"
  });
  console.log(`Status code: ${res.status}`);
  console.log(`Status text: ${res.statusText}`);
  console.log(`Request method: ${res.request.method}`);
  console.log(`Path: ${res.request.path}`);
  console.log(`Date: ${res.headers.date}`);
  console.log(`Data: ${res.data}`);
  // navigation.navigate('Home');
}

export default function RestaurantScreen({ navigation, route }) {
  return (
    <View>
      <Text> This is restaurant screen </Text>
      <Button
        title='Order'
        onPress={() => { makeOrder() }}
      />
    </View>
  );
}
