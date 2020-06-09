import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  state = {}
  render() {
    const isSignedIn = true;

    return (
      <NavigationContainer linking={LinkingConfiguration}>
        {
          isSignedIn ? (
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
            )
        }
      </NavigationContainer>
    );
  }
}

export default AppNavigator;