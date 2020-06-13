import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { styles } from "../src/styles/styles";
import AccountProfile from "../src/components/AccountProfile";

class AccountScreen extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        {this.props.user ? (
          <AccountProfile
            user={this.props.user}
            signOut={this.props.signOut}
            loadInitialPage={() => this.props.navigation.goBack(null)}
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
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
