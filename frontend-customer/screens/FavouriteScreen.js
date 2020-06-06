import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Menus from '../src/components/Menus';

class FavouriteScreen extends React.Component {
  // state = { favs: [] }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({
  //     favs: prevProps.favItems.map(
  //       i => { <Text>{i.name}</Text> }
  //     )
  //   })
  // }

  render() {
    return (
      <View>
        {
          this.props.favItems.length > 0 ?
            <Menus
              itemCount={this.props.itemCount}
              favItems={this.props.favItems}
              menus={this.props.favItems}
              onPressFav={this.props.favItem}
              onPressUnfav={this.props.unfavItem}
              onPress={(item) => {
                this.props.addItemToCart(item);
              }} /> :
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 20 }}>
                No favourite items
            </Text>
            </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cartItems.itemCount,
    favItems: state.favItems.favItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => dispatch({ type: 'INC_ITEM', payload: item }),
    favItem: (item) => dispatch({ type: 'FAV_ITEM', payload: item }),
    unfavItem: (item) => dispatch({ type: 'UNFAV_ITEM', payload: item }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen)
