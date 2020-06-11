import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';
import { axios, urlList } from '../src/backend-api/api';

class OrdersCurrentScreen extends React.Component {
  state = {}

  renderPreparedOrders = async () => {
    try {
      let res = await axios.get(urlList.orders + this.props.id + '/prepared');
      let orders = res.data;

      this.setState({
        preparedOrders: orders.map(order => (
          <OrderCard
            orderNumber={order._id}
            item={order.items}
            creationTime={order.createdAt}
            prepared={1}
            totalPrice={order.total_price}
            restaurant={order.restaurant_id} />
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderPreparingOrders = async () => {
    try {
      let res = await axios.get(urlList.orders + this.props.id + '/preparing');
      let orders = res.data;

      console.log("===========")
      console.log(urlList.orders + this.props.id + '/preparing')
      console.log(orders)

      this.setState({
        preparingOrders: orders.map(order => (
          <OrderCard
            orderNumber={order._id}
            item={order.items}
            creationTime={order.createdAt}
            prepared={0}
            queuePosition={order.queuePosition}
            totalPrice={order.total_price}
            restaurant={order.restaurant_id}
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

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={"md-restaurant"} size={40} color="rgba(0,0,0,0.35)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={{ fontSize: 20 }}>Prepared orders:</Text>
          </View>
        </View>
        {this.state.preparedOrders}
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={"md-time"} size={40} color="rgba(0,0,0,0.35)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={{ fontSize: 20 }}>Preparing orders:</Text>
          </View>
        </View>
        {this.state.preparingOrders}
      </ScrollView>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    id: state.user.id
  }
}

export default connect(mapStateToProps)(OrdersCurrentScreen);

