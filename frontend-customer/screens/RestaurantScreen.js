import * as React from "react";
import { View, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { Searchbar } from "react-native-paper";

import MenuItems from "../src/components/MenuItems";
import { styles } from "../src/styles/styles";
import { axios, urlList } from "../src/backend-api/api";

class RestaurantScreen extends React.Component {
  state = { menu: [], searchQuery: "" };

  compareMenu(a, b) {
    if (a.availability < b.availability) {
      return -1;
    }
    if (a.availability > b.availability) {
      return 1;
    }
    return a._id - b._id;
  }

  faved(favedItems, item) {
    return favedItems.filter((i) => item._id === i._id).length !== 0;
  }

  sortMenu(menu) {
    const favedItems = menu
      .filter((i) => this.faved(this.props.favItems, i))
      .sort(this.compareMenu);
    const notfavedItems = menu
      .filter((i) => !this.faved(this.props.favItems, i))
      .sort(this.compareMenu);

    return favedItems.concat(notfavedItems);
  }

  updateMenu = () => {
    axios
      .get(urlList.items + this.props.route.params.id)
      .then((res) => {
        var allItems = res.data;
        var allRelevantItems = allItems.filter((item) =>
          item.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );
        this.setState({ menu: this.sortMenu(allRelevantItems) });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  componentDidMount() {
    this.updateMenu();
    this.menuInterval = setInterval(this.updateMenu, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.menuInterval);
  }

  render() {
    const title = this.props.route.params.title;
    const { searchQuery } = this.state;

    this.props.navigation.setOptions({
      headerTitle: title,
    });

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search meal"
          onChangeText={this._onChangeSearch}
          value={searchQuery}
        />
        <MenuItems
          buttonText="Add to cart"
          key={this.state.menu}
          itemCount={this.props.itemCount}
          favItems={this.props.favItems}
          menus={this.state.menu}
          onPressFav={this.props.favItem}
          onPressUnfav={this.props.unfavItem}
          onPress={(item) => {
            this.props.addItemToCart(item);
            ToastAndroid.show(
              "Item Added to Shopping Cart",
              ToastAndroid.SHORT
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemCount: state.cartItems.itemCount,
    favItems: state.favItems.favItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => dispatch({ type: "INC_ITEM", payload: item }),
    favItem: (item) => dispatch({ type: "FAV_ITEM", payload: item }),
    unfavItem: (item) => dispatch({ type: "UNFAV_ITEM", payload: item }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);
