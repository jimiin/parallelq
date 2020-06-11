import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  
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
  },container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: -15,
  },
  description: {
    height: 0,
    flexWrap: 'wrap',
    color: 'transparent',
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: '#f8f8f8',
    paddingBottom: 0,
  },
  available: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#29cf53',
  },
  unavailable: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#d93030',
  },

});
