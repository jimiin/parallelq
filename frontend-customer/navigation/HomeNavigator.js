import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import ShoppingCartIcon from '../src/components/ShoppingCartIcon';

const Stack = createStackNavigator();

export default function HomeNavigator({ navigation, route }) {
  const shoppingCart =
    <ShoppingCartIcon
      onPress={() => navigation.navigate('Cart')}
    />;

  return (
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
      <Stack.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={() => ({
          headerRight: () => shoppingCart
        })} />
      <Stack.Screen name="Cart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
}
