const React = require('react-native')
const {StyleSheet, Dimensions} = React
const constants = {
  actionColor: '#24CE84'
};
const {height, width}= Dimensions.get('window')
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  liTextName: {
    color: '#24CE84',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center'
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  ActionButton: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  inputField: {
    marginTop: 40,
    marginBottom: 40,
    width: width,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  buttonView: {
    backgroundColor: 'red',
  },
  msgContainer: {
    flexDirection: 'row',
  },
  msgInputField: {
    width: width/ 1.3,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignSelf: 'center',
  }
})

module.exports = styles
module.exports.constants = constants;