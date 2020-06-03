import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'

import ShoppingCartItems from '../src/components/ShoppingCartItems';
import { axios, url } from '../src/backend-api/api';
import { styles } from '../src/styles/styles';
import { formatter } from '../src/styles/formatter';

async function makeOrder(item) {
  let res = await axios.post(url + "/orders/add", {
    items: item.name
  });
}

class ShoppingCartScreen extends React.Component {
  makeOrders() {
    this.props.items.map(item => makeOrder(item));
  }

  totalPrice() {
    let prices = this.props.items.map(item => item.price);
    const reducer = (acc, val) => acc + val;
    return prices.reduce(reducer, 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <ShoppingCartItems
          onPress={this.props.remove}
          items={this.props.items}
        />
        <Text style={{ fontSize: 20 }}>
          Total: {formatter.format(this.totalPrice())}
        </Text>
        <Button
          title='Order'
          color="#841584"
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
    remove: (item) => dispatch({ type: 'REMOVE_ITEM', payload: item }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen)
