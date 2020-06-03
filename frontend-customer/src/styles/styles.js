import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  fitImage: {
    width: window.width - 60,
    height: 150,
    resizeMode: 'cover',
  },
  cartItemCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(173, 216, 232, 0.8)',
    right: 15,
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  cartIconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5
  }
});
