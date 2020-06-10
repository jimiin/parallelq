import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { connect } from 'react-redux';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  state = {}
  render() {
    const isSignedIn =
      this.props.id !== undefined && this.props.id !== null;

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

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
    signOut: () => dispatch({ type: 'SIGN_OUT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
