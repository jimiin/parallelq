import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

import { connect } from 'react-redux'

class ShoppingCartIcon extends React.Component {
  totalCount() {
    let counts = this.props.itemCount.map(i => i.count);
    const reducer = (acc, val) => acc + val;
    return counts.reduce(reducer, 0);
  }

  render() {
    return (
      <View style={{ padding: 5 }}>
        <View style={styles.cartItemCountContainer}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {this.totalCount()}
          </Text>
        </View>
        <Ionicons
          name="ios-cart"
          size={50}
          onPress={this.props.onPress} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.itemCount
  }
}

export default connect(mapStateToProps)(ShoppingCartIcon);
