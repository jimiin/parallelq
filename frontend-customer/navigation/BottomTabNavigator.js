import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeNavigator from './HomeNavigator';
import OrdersNavigator from './OrdersNavigator';
import MapScreen from '../screens/MapScreen';
import AccountScreen from '../screens/AccountScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

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
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-reorder" />,
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
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
  return route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
}

function showHeader(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return false;
  }
}
