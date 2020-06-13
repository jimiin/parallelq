import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import AccountProfile from "../components/AccountProfile";

class AccountScreen extends React.Component {
  state = {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fafafa",
        }}
      >
        {this.props.id !== undefined && this.props.id !== null ? (
          <AccountProfile
            id={this.props.id}
            onPressLogOut={() => {
              console.log("Log out");
              this.props.signOut();
              this.props.navigation.goBack(null);
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>You need to log in!</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
