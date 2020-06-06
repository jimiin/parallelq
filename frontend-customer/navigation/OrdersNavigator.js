import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import OrdersCurrentScreen from '../screens/OrdersCurrentScreen';
import OrdersPastScreen from '../screens/OrdersPastScreen';

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
        name="Current Orders"
        component={OrdersCurrentScreen}
      />
      <TopTab.Screen
        name="Past Orders"
        component={OrdersPastScreen}
      />
    </TopTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return route.state?.routes[route.state.index]?.name;
}
