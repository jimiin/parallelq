import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';
import { axios, url } from '../src/backend-api/api';

class CurrentOrdersScreen extends React.Component {
  state = {}

  renderPreparedOrders = async () => {
    try {
      let res = await axios.get(url + '/orders/status/prepared');
      let orders = res.data;

      this.setState({
        preparedOrders: orders.map(order => (
          <OrderCard
            orderNumber={order._id}
            item={order.items}
            creationTime={order.createdAt}
            prepared={1}
          />
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderPreparingOrders = async () => {
    try {
      let res = await axios.get(url + '/orders/status/preparing');
      let orders = res.data;

      this.setState({
        preparingOrders: orders.map(order => (
          <OrderCard
            orderNumber={order._id}
            item={order.items}
            creationTime={order.createdAt}
            prepared={0}
            queuePosition={order.queuePosition}
          />
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.renderPreparingOrders();
    this.renderPreparedOrders();

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={{fontSize:20}}>Prepared orders:</Text>
        {this.state.preparedOrders}
        <Text style={{fontSize:20, marginTop: 10}}>Preparing orders:</Text>
        {this.state.preparingOrders}
      </ScrollView>);
  }
}

export default CurrentOrdersScreen;
