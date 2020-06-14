import * as React from "react";
import { View, Text, Modal, Button, ToastAndroid } from "react-native";
import { connect } from "react-redux";

import MenuItems from "../components/MenuItems";
import { styles } from "../styles/styles";

class FavouriteScreen extends React.Component {
  state = { modalVisible: false };

  fromSameRestaurant(item) {
    const itemCount = this.props.itemCount;

    if (itemCount.length === 0) {
      return true;
    }
    return itemCount[0].item.restaurant_id === item.restaurant_id;
  }

  addItemToCart(item) {
    this.props.addItemToCart(item);
    ToastAndroid.show("Item Added to Shopping Cart", ToastAndroid.SHORT);
    this.props.navigation.navigate("Cart");
  }

  handleOpen = (item) => {
    this.setState({
      modalVisible: true,
      item: item,
    });
  };

  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.favItems.length > 0 ? (
          <MenuItems
            buttonText={"Order now"}
            key={this.props.favItems}
            itemCount={this.props.itemCount}
            favItems={this.props.favItems}
            menus={this.props.favItems}
            onPressFav={this.props.favItem}
            onPressUnfav={this.props.unfavItem}
            onPress={(item) => {
              if (this.fromSameRestaurant(item)) {
                this.addItemToCart(item);
              } else {
                this.handleOpen(item);
              }
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favourite items</Text>
          </View>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.handleClose}
        >
          <View style={styles.notificationView}>
            <View style={styles.notificationContainer}>
              <View style={{ padding: 10 }}>
                <Text style={styles.notificationTitle}>
                  You can only order items from one restaurant at a time
                </Text>
                <Text style={styles.notificationText}>
                  Clear your shopping cart if you'd still like to order this
                  item
                </Text>
              </View>

              <View style={{ padding: 5 }}>
                <Button
                  title="Clear shopping cart and add"
                  onPress={() => {
                    this.props.resetCart();
                    this.addItemToCart(this.state.item);
                    this.handleClose();
                  }}
                />
              </View>

              <View style={{ padding: 5 }}>
                <Button title="Cancel" onPress={() => this.handleClose()} />
              </View>
            </View>
          </View>
        </Modal>
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
    resetCart: () => dispatch({ type: "RESET" }),
    addItemToCart: (item) => dispatch({ type: "INC_ITEM", payload: item }),
    favItem: (item) => dispatch({ type: "FAV_ITEM", payload: item }),
    unfavItem: (item) => dispatch({ type: "UNFAV_ITEM", payload: item }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);
