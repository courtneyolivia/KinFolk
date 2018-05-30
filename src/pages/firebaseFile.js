
import * as React from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const StatusBar = require('../components/StatusBar');
const MessageInput = require('../components/messageInput');
const ListItem = require('../components/ListItem');
const styles = require('./styles')

import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBimbfuJptP71P7gLgCmRSlx35jM1B-xr4",
  authDomain: "group-chat-22c62.firebaseapp.com",
  databaseURL: "https://group-chat-22c62.firebaseio.com",
  projectId: "group-chat-22c62",
  storageBucket: "group-chat-22c62.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'notDefault');

export default class FirebaseReactNativeSample extends React.Component {
static navigationOptions = {
    headerMode: 'none',
    header: null,
    gesturesEnabled: false
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      user: '',
      navigate: this.props.navigation.navigate,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
    this.itemsReference = this.getRef().child('name');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      console.log(snap)
      var itemsListView = [];
      snap.forEach((child) => {
        itemsListView.push({
          title: child.val().title,
          _key: child.key,
          name: child.val().name,
        });
      });
      console.log(itemsListView)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(itemsListView)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
       <View style={styles.container}>
        <StatusBar title="Jones Family Group Chat" />
        <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderItem.bind(this)}
           enableEmptySections={true}
           style={styles.listview}/>
         <MessageInput onPress={this._addItem.bind(this)} title="Send" onChangeText={(text) => this.setState({text})} value={this.state.text}/>
         </View>
    )
  }

  _addItem() {
    this.itemsRef.push({ title: this.state.text, name: this.state.user})
    this.setState({text: ''})
  }
  _renderItem(item) {
    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
       <ListItem item={item} onPress={onPress} />
    );
  }

}