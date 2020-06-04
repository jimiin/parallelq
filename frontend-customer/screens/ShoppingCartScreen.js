import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'

import ShoppingCartItems from '../src/components/ShoppingCartItems';
import { axios, url } from '../src/backend-api/api';
import { styles } from '../src/styles/styles';
import { formatter } from '../src/styles/formatter';

async function makeOrder(item) {
  let res = await axios.post(url + "/orders/add", {
    items: item
  });
}

class ShoppingCartScreen extends React.Component {
  makeOrders() {
    this.props.itemCount.map(
      i => makeOrder(i.item));
  }

  totalPrice() {
    let prices = this.props.itemCount.map(
      i => i.item.price * i.count
    );
    const reducer = (acc, val) => acc + val;
    return prices.reduce(reducer, 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <ShoppingCartItems
          onPressPlus={this.props.incItem}
          onPressMinus={this.props.decItem}
          onPressRemove={this.props.removeItemFromCart}
          itemCount={this.props.itemCount}
        />
        <Text style={{ fontSize: 20 }}>
          Total: {formatter.format(this.totalPrice())}
        </Text>
        <Button
          title='Order'
          color="#841584"
          onPress={() => {
            this.makeOrders();
            (this.props.resetCart)();
          }}
        />
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
    incItem: (item) => dispatch({ type: 'INC_ITEM', payload: item }),
    decItem: (item) => dispatch({ type: 'DEC_ITEM', payload: item }),
    removeItemFromCart: (item) => dispatch({ type: 'REMOVE_ITEM', payload: item }),
    resetCart: () => dispatch({ type: 'RESET' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen)
