import * as React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { axios, urlList } from '../backend-api/api';
import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';

class OrderCard extends React.Component {
  state = {}

  componentDidMount() {
    axios.get(urlList.restaurants + this.props.restaurantId)
      .then(res => {
        this.setState({ restaurantName: res.data.name })
      })
      .catch(err => {
        console.log(err);
      });
  }

  ordinalSuffix = (queuePosition) => {
    const pos = queuePosition + 1
    const i = pos % 10
    const j = pos % 100;
    if (i == 1 && j != 11) {
      return pos + "st";
    }
    if (i == 2 && j != 12) {
      return pos + "nd";
    }
    if (i == 3 && j != 13) {
      return pos + "rd";
    }
    return pos + "th";
  }

  /* TODO: Add number of people in queue in case 2 */
  orderStatus = (prepared, queuePosition) => {
    switch (prepared) {
      case 0:
        return (
          <Text style={styles.orderTitle}>
            Position in queue: {this.ordinalSuffix(queuePosition)}
          </Text>
        )
      case 1:
        return (
          <Text style={styles.orderTitle}>
            Pick Up Now
          </Text>
        )
      case 2:
      default:
        return (<Text></Text>)
    }
  }

  orderTime = (creationTime) => {
    const dateTime = creationTime.split('T')
    const date = dateTime[0];
    const time = (dateTime[1]).split('.')[0];
    return (
      <Text style={styles.optionText}>
        Ordered: {date + ' at ' + time}
      </Text>)
  }

  render() {
    return (
      <RectButton
        style={[(this.props.prepared == 1) ?
          styles.preparedRow :
          styles.preparingRow,
        { borderRadius: 10, margin: 10 }]}
        onPress={() => console.log("pressed")} >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
              <View style={styles.title}>
                <Text style={styles.orderTitle}>
                  Order #{this.props.orderNumber}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {this.orderStatus(this.props.prepared, this.props.queuePosition)}
            </View>
          </View>

          <Text style={styles.orderTitle}>{this.state.restaurantName}</Text>
          <Text style={styles.itemNameText}>{this.props.item}</Text>
          <Text style={styles.itemNameText}>{formatter.format(this.props.totalPrice)}</Text>
          <View style={styles.optionTextContainer}>
            {this.orderTime(this.props.creationTime)}
          </View>
        </View>

      </ RectButton>
    );
  }
}

export default OrderCard;
