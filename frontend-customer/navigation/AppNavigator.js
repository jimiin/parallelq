import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  state = {}

  // TODO
  componentDidMount() {
    AsyncStorage.getItem('user')
      .then(data => {
        if (data !== null) {
          console.log("=================================")
          console.log(data);
          //this.props.signIn(data);
        }
      })
      .catch(err => console.log('Error: ' + err))
    // React.useEffect(() => {
    //   data = AsyncStorage.getItem('user');
    // })

  }

  render() {
    const isSignedIn = this.props.user;

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
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user, id) =>
      dispatch({ type: 'SIGN_IN', user: user, id: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
