import * as React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import Menus from '../src/components/Menus';
import { styles } from '../src/styles/styles';
import { axios, url } from '../src/backend-api/api';

class RestaurantScreen extends React.Component {
  state = { menu: [], modalVisible: false }

  compareMenu(a, b) {
    if (a.availability < b.availability) {
      return -1
    }
    if (a.availability > b.availability) {
      return 1
    }
    return a._id - b._id
  }

  faved(favedItems, item) {
    return favedItems.filter(i => item._id === i._id).length !== 0
  }

  sortMenu(menu) {
    const favedItems = menu
      .filter(i => this.faved(this.props.favItems, i))
      .sort(this.compareMenu)
    const notfavedItems = menu
      .filter(i => !this.faved(this.props.favItems, i))
      .sort(this.compareMenu)

    return favedItems.concat(notfavedItems)
  }

  updateMenu = () => {
    axios.get(url + '/items/')
      .then(res => {
        this.setState({ menu: this.sortMenu(res.data) })
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  }

  componentDidMount() {
    this.updateMenu();
    this.menuInterval = setInterval(this.updateMenu, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.menuInterval);
  }

  handleOpen = () => {
    this.setState({
      modalVisible: true
    });
    setTimeout(this.handleClose, 1000);
  };

  handleClose = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const title = this.props.route.params.title;

    this.props.navigation.setOptions(
      {
        headerTitle: title
      }
    );

    return (
      <View style={styles.container}>
        <Menus
          key={this.state.menu}
          itemCount={this.props.itemCount}
          favItems={this.props.favItems}
          menus={this.state.menu}
          onPressFav={this.props.favItem}
          onPressUnfav={this.props.unfavItem}
          onPress={(item) => {
            this.props.addItemToCart(item);
            this.handleOpen();
          }} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.handleClose}>
          <TouchableWithoutFeedback
            onPress={this.handleClose}>
            <View style={styles.notificationView}>
              <View style={styles.notificationContainer}>
                <Text style={{ color: 'white' }}>
                  Added to Shopping Cart!
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)