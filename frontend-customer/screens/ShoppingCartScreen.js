import * as React from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux'

import ShoppingCartItems from '../src/components/ShoppingCartItems';
import { axios, urlList } from '../src/backend-api/api';
import { styles } from '../src/styles/styles';
import { formatter } from '../src/styles/formatter';

class ShoppingCartScreen extends React.Component {
  state = {
    modalVisible: false,
    orderSuccessful: true,
  }

  makeOrders = async () => {
    let order = ""
    this.props.itemCount
      .filter(i => i.count > 0)
      .map(i => { order += (i.item.name + " x" + i.count + "\n") });

    this.setState({ orderSuccessful: (order !== "") });

    if (order !== "") {
      try {
        let res = await axios.post(urlList.makeOrder, {
          items: order.substring(0, order.length - 1),
          restaurant_id: exampleItem.restaurant_id,
          user_id: this.props.id,
          total_price: this.totalPrice()
        });
      } catch (e) {
        console.log("Error: " + e);
      }
    }
  }

  totalPrice = () => {
    let prices = this.props.itemCount.map(
      i => i.item.price * i.count
    );
    const reducer = (acc, val) => acc + val;
    return prices.reduce(reducer, 0);
  }

  handleOpen = () => {
    this.setState({
      modalVisible: true
    });
    setTimeout(this.handleClose, 1000);
  };

  handleClose = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.itemCount.length > 0 ?
            <ShoppingCartItems
              key={this.props.itemCount}
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
          color='#00008B'
          onPress={() => {
            this.makeOrders();
            (this.props.resetCart)();
            this.handleOpen();
          }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(false) }}>
          <TouchableWithoutFeedback
            onPress={this.handleClose}>
            <View style={styles.notificationView}>
              <View style={styles.notificationContainer}>
                {
                  (this.state.orderSuccessful) ?
                    <Text style={{ color: 'white' }}>
                      Order has been successfully made!
                    </Text> :
                    <Text style={{ color: 'white' }}>
                      Your cart is empty!
                    </Text>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cartItems.itemCount,
    id: state.user.id
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
