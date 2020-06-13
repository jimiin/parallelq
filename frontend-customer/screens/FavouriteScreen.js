import * as React from "react";
import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";

import MenuItems from "../src/components/MenuItems";
import { styles } from "../src/styles/styles";

class FavouriteScreen extends React.Component {
  state = { modalVisible: false };

  handleOpen = () => {
    this.setState({
      modalVisible: true,
    });
    setTimeout(this.handleClose, 1000);
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
              this.props.addItemToCart(item);
              this.props.navigation.navigate("Cart");
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
          <TouchableWithoutFeedback onPress={this.handleClose}>
            <View style={styles.notificationView}>
              <View style={styles.notificationContainer}>
                <Text style={{ color: "white" }}>Added to Shopping Cart!</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);
