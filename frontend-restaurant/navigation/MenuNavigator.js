import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Button } from "react-native";

import MenuScreen from "../screens/MenuScreen";
import AddMenuScreen from "../screens/AddMenuScreen";

const Stack = createStackNavigator();

export default function MenuNavigator({ navigation, route }) {
  const addItem =
    <Button
      title="Add Meal"
      onPress={() => navigation.navigate('NewMeal')}
    />;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={() => ({
          headerRight: () => addItem
        })} />
      <Stack.Screen name="NewMeal" component={AddMenuScreen} />
    </Stack.Navigator>
  );
}
