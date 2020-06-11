import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { styles } from '../src/styles/styles';
import OrderCard from '../src/components/OrderCard';
import { axios, urlList } from '../src/backend-api/api';

class OrderPastScreen extends React.Component {
  state = {}

  componentDidMount() {
    this.updateOrders();
    this.updateInterval = setInterval(this.updateOrders, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateOrders = () => {
    axios.get(urlList.orders + this.props.id + '/past')
      .then(res => {
        const orders = res.data;
        this.setState({
          Orders: orders.map(order => (
            <OrderCard
              orderNumber={order._id}
              item={order.items}
              creationTime={order.createdAt}
              prepared={2}
              totalPrice={order.total_price}
              restaurant={order.restaurant_id}
            />
          ))
        });
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.state.Orders}
      </ScrollView>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    id: state.user.id
  }
}

export default connect(mapStateToProps)(OrderPastScreen);
