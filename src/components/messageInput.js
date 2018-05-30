
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../pages/styles.js')
const constants = styles.constants;
const {StyleSheet,TextInput, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (  
      <View style={styles.msgContainer}>
        <View>
          <TextInput
            style={styles.msgInputField}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            placeholder={"Enter your message"}
          />
       </View>
       <TouchableHighlight
         underlayColor={constants.actionColor}
         onPress={this.props.onPress}
        >
         <View style={styles.ActionButton}>
           <Text style={styles.actionText}>{this.props.title}</Text>
         </View>
     </TouchableHighlight>
    </View>
    );
  }
}

module.exports = ActionButton;