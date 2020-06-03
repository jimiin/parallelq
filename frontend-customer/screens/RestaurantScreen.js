import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'

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
      <View>
        <Button
          title='Add to cart'
          onPress={this.props.addItemToCart}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: () => dispatch({ type: 'ADD_ITEM' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)