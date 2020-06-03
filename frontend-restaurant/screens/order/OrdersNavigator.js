import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import PreparingScreen from './PreparingScreen';
import ReadyScreen from './ReadyScreen';


const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Preparing';

export default function OrdersNavigator({ navigation, route }) {
  navigation.setOptions(
    {
      headerTitle: getHeaderTitle(route)
    }
  );

  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <TopTab.Screen
        name="Preparing"
        component={PreparingScreen}
      />
      <TopTab.Screen
        name="Ready"
        component={ReadyScreen}
      />
    </TopTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return route.state?.routes[route.state.index]?.name;
}
