import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import OrdersScreen from '../screens/OrdersScreen';

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
        component={OrdersScreen}
      />
      <TopTab.Screen
        name="Pick up"
        component={OrdersScreen}
      />
      <TopTab.Screen
        name="Past Orders"
        component={OrdersScreen}
      />
    </TopTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return route.state?.routes[route.state.index]?.name;
}
