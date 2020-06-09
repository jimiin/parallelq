import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function AccountNavigator({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}
