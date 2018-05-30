import * as React from 'react';
import ReactNative from 'react-native';
const styles = require('../pages/styles')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends React.Component {
  render() {
    return (
     <View style={styles.action}>
       <TouchableHighlight
         underlayColor={constants.actionColor}
         onPress={this.props.onPress}>
       <Text style={styles.actionText}>{this.props.title}</Text>
       </TouchableHighlight>
    </View> 
    );
  }
}

module.exports = ActionButton;