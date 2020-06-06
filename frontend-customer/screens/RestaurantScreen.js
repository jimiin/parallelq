import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Menus from '../src/components/Menus';
import { styles } from '../src/styles/styles';
import { axios, url } from '../src/backend-api/api';

class RestaurantScreen extends React.Component {
  state = { menu: [] }

  compareMenu(a, b) {
    if (a.availability < b.availability) {
      return -1
    }
    if (a.availability > b.availability) {
      return 1
    }
    return a._id - b._id
  }

  updateMenu = () => {
    axios.get(url + '/items/')
      .then(res => {
        this.setState({ menu: res.data });
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

  getMenu() {
    return this.state.menu.sort(this.compareMenu)
  }

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
          itemCount={this.props.itemCount}
          menus={this.getMenu()}
          onPress={this.props.addItemToCart} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.itemCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => dispatch({ type: 'INC_ITEM', payload: item }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen)