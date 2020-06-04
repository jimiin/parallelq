import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import ShoppingCartIcon from '../src/components/ShoppingCartIcon';
import OrdersNavigator from "./OrdersNavigator"

import { Provider } from 'react-redux'
import { store } from '../src/store/index'

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation, route }) {
  const shoppingCart =
    <ShoppingCartIcon
      onPress={() => navigation.navigate('Cart')}
    />;

  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            headerRight: () => shoppingCart
          })} />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={() => ({
            headerRight: () => shoppingCart
          })} />
        <Stack.Screen name="Cart" component={ShoppingCartScreen} />
        <Stack.Screen name="Orders" component={OrdersNavigator} />
      </Stack.Navigator>
    </Provider>
  );
}
