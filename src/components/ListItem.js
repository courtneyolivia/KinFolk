import * as React from 'react';
import ReactNative from 'react-native';
const styles = require('../pages/styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liTextName}>{this.props.item.name}</Text>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;