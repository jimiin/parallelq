import * as React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux'

import OrderCard from '../src/components/OrderCard';
import { axios, url } from '../src/backend-api/api';

async function makeOrder(item) {
  let res = await axios.post(url + "/orders/add", {
    items: item
  });
}

class ShoppingCartScreen extends React.Component {
  state = { Items: [] }

  makeOrders() {
    this.props.items.map(item => makeOrder(item));
  }

  renderItems() {
    let shoppingCartItems = this.props.items
    let stateItems = this.state.Items

    if (shoppingCartItems.length != stateItems.length) {
      this.setState({
        Items: shoppingCartItems.map(item => (
          <OrderCard
            orderNumber="1"
            item={item}
            onPress={this.props.remove}
          />
        ))
      })
    }
  }

  render() {
    this.renderItems();

    return (
      <View>
        {this.state.Items}
        <Button
          title='Order'
          onPress={() => {
            this.makeOrders();
            (this.props.reset)();
          }}
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
    add: () => dispatch({ type: 'ADD_ITEM' }),
    remove: () => dispatch({ type: 'REMOVE_ITEM' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen)
