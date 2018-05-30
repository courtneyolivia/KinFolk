import * as React from 'react';
import ReactNative from 'react-native';
import {BaseContainer} from "../components";
import {DrawerNavigator} from 'react-navigation';

const styles = require('../pages/styles.js')
const { StyleSheet, Text, View, TouchableOpacity,} = ReactNative;

class StatusBar extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        </View>
    );
  }
}

module.exports = StatusBar;
