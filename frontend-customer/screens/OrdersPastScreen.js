import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';

const url = 'http://localhost:5000'
const axios = require('axios');

class OrderPastScreen extends React.Component {
  state = {}

  renderOrders = async () => {
    try {
      let res = await axios.get(url + '/orders/status/past');
      let orders = res.data;

      this.setState({
        Orders: orders.map(order => (
          <OrderCard
            orderNumber="1"
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

export default OrderPastScreen;
