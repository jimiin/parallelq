import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

class AccountScreen extends React.Component {
  state = {}
  render() {
    return (
      <View style={styles.container}>
        {
          (this.props.id !== undefined && this.props.id !== null) ? (
            <View style={styles.container}>
              <OptionButton
                icon="md-log-out"
                label={this.props.id}
              />
              <OptionButton
                icon="md-log-out"
                label="Log out"
                onPress={() => {
                  console.log("Log out")
                  this.props.signOut();
                  this.props.navigation.goBack(null);
                }}
              />
            </View>
          ) : (
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 20 }}>
                  You need to log in!
                </Text>
              </View>
            )
        }
      </View>
    );
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


const mapStateToProps = (state) => {
  return {
    id: state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
