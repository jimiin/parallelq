import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';
import { axios, url } from '../src/backend-api/api';

class OrdersPreparingScreen extends React.Component {
  state = {}

  renderOrders = async () => {
    try {
      let res = await axios.get(url + '/orders/status/preparing');
      let orders = res.data;

      this.setState({
        Orders: orders.map(order => (
          <OrderCard
            orderNumber={order._id}
            item={order.items}
          />
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.renderOrders();

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.state.Orders}
      </ScrollView>);
  }
}

export default OrdersPreparingScreen;