import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

import { connect } from 'react-redux'

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <View style={{ padding: 5 }}>
        <View style={styles.cartItemCountContainer}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {this.props.items.length}
          </Text>
        </View>
        <Ionicons
          name="ios-cart"
          size={30}
          onPress={this.props.onPress} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(ShoppingCartIcon);
