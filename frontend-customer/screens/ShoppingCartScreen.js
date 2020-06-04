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
    let order = ""
    this.props.itemCount
      .filter(i => i.count > 0)
      .map(i => { order += (i.item.name + " x" + i.count + "\n") });

    if (order !== "") {
      makeOrder(order);
    }
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
        {
          this.props.itemCount.length > 0 ?
            <ShoppingCartItems
              onPressPlus={this.props.incItem}
              onPressMinus={this.props.decItem}
              onPressRemove={this.props.removeItemFromCart}
              itemCount={this.props.itemCount}
            /> :
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 20 }}>
                Your Cart is empty!
              </Text>
            </View>
        }
        <Text style={{ fontSize: 20 }}>
          Total: {formatter.format(this.totalPrice())}
        </Text>
        <Button
          title='Order'
          color="#841584"
          onPress={() => {
            this.makeOrders();
            (this.props.resetCart)();
            this.forceUpdate();
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
