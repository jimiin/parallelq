import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import { axios, urlList } from '../src/backend-api/api';
import RestaurantScreen from '../screens/RestaurantScreen';

const TopTab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Preparing';

export default function RestaurantNavigator({ navigation, route }) {
  const title = this.props.route.params.title;

  navigation.setOptions(
    {
      headerTitle: title
    }
  );

  const screens = createNavigators();

  return (
    <TopTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {screens}
    </TopTab.Navigator>
  );
}

createNavigators = () => {
  axios.get(urlList.categories + this.props.route.params.id)
  .then(res => {
    categories = res.data;
    tabs = []
    for (let i = 0; i < categories.length; i++) {
      tabs.push(<TopTab.Screen
        name={categories[i].name}
        // id may have to change depending on field name in backend
        component={() => <RestaurantScreen category_id={categories[i].id}/>}
      />)
    }
    return tabs;
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
  
}
