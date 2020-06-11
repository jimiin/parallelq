import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import SaleScreen from '../screens/SaleScreen';
import MenuScreen from '../screens/MenuScreen';
import OrdersNavigator from '../screens/order/OrdersNavigator';
import AccountScreen from '../screens/AccountScreen';
import MenuNavigator from './MenuNavigator';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Orders';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions(
    {
      headerTitle: getHeaderTitle(route),
      headerShown: showHeader(route)
    }
  );

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-reorder" />,
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-restaurant" />,
        }}
      />
      <BottomTab.Screen
        name="Sale"
        component={SaleScreen}
        options={{
          title: 'Sale',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="logo-usd" />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-body" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Orders':
      return 'ParallelQ - Orders';
  }
  return routeName;
}

function showHeader(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Menu":
      return false;
  }
}
