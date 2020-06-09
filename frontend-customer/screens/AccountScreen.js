import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

class AccountScreen extends React.Component {
  state = {}
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: this.props.user.photoUrl }} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {this.props.user.name}
          </Text>
        </View>

        <OptionButton
          icon="md-mail"
          label={this.props.user.email}
        />

        <OptionButton
          icon="md-log-out"
          label="Log out"
          onPress={() => {
            // this.navigation.navigate("Login");
            // this.props.signOut();
            console.log("Log out");
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={30} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  nameContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
