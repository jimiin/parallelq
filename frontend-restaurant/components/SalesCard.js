import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class SalesCard extends React.Component {
  updateTime = (updatedTime) => {
    const dateTime = updatedTime.split('T')
    const date = dateTime[0];
    const time = (dateTime[1]).split('.')[0];
    return (
      <Text style={styles.optionText}>
        Ordered: {date + ' at ' + time}
      </Text>)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.orderTitle}>
            Order #{this.props.orderNumber}
          </Text>
          <Text style={styles.itemNameText}>{this.props.item}</Text>
          <Text style={styles.itemNameText}>£{this.props.totalPrice}</Text>
          <Text>{this.updateTime(this.props.time)}</Text>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10, margin: 10
  },
  optionTextContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  orderTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '300',
  },
  itemNameText: {
    fontSize: 17.5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
})

export default SalesCard;
