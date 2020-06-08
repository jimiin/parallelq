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
  optionTextContainer: {
    marginTop: 10,
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
    marginTop: 1,
    textAlign: 'left',
  },
  itemNameText: {
    fontSize: 17.5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  itemPriceText: {
    alignSelf: 'flex-start',
    marginTop: 1,
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
  },
  fitImage: {
    width: window.width - 60,
    height: 150,
    resizeMode: 'cover',
  },


  /* new items */


  cartItemCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(173, 216, 232, 0.8)',
    right: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  cartIconContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginRight: 5
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  orderTitle: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  preparingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  preparedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#96cdff',
  },
  priceTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 20
  },
  windowWidth: {
    width: window.width - 10
  },
  cartButtonsContainer: {
    flexDirection: 'row',
  },
  cartButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    padding: 5,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
  descriptionContainer: {
    width: window.width - 10
  },
  description: {
    height: 0,
    flexWrap: 'wrap',
    color: 'transparent',
  },
  notificationView: {
    position: 'absolute',
    height: 40,
    width: window.width,
    top: window.height - 100,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationContainer: {
    width: 300,
    borderRadius: 15,
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  }
});
