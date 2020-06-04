import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import Menus from '../src/components/Menus'
import { menus } from '../src/backend-api/data'
import { styles } from '../src/styles/styles';

class RestaurantScreen extends React.Component {
  state = {}
  render() {
    const title = this.props.route.params.title;

    this.props.navigation.setOptions(
      {
        headerTitle: title
      }
    );

    return (
      <View style={styles.container}>
        <Menus
          itemCount={this.props.itemCount}
          menus={menus}
          onPress={this.props.addItemToCart} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.itemCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => dispatch({ type: 'INC_ITEM', payload: item }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)