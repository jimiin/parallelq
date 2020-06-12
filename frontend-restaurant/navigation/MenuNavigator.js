import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Button } from "react-native";

import MenuScreen from "../screens/MenuScreen";
import AddMenuScreen from "../screens/AddMenuScreen";
import EditMenuScreen from "../screens/EditMenuScreen";

const Stack = createStackNavigator();

export default function MenuNavigator({ navigation, route }) {
  const addItem = (
    <Button title="Add Meal" onPress={() => navigation.navigate("Add Menu")} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={() => ({
          headerRight: () => addItem,
        })}
      />
      <Stack.Screen name="Add Menu" component={AddMenuScreen} />
      <Stack.Screen name="Edit Menu" component={EditMenuScreen} />
    </Stack.Navigator>
  );
}
