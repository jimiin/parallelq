import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import AccountProfile from "../components/AccountProfile";
import { styles } from "../styles/styles";

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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You need to log in!</Text>
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
