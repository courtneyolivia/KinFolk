import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Header, Left, Right, Body, Icon, Title, Spinner, Input, Content} from "native-base";
import {AppRegistry} from 'react-native';

import {StackNavigator} from 'react-navigation';
import FirebasePage from '../pages/firebaseFile';
import Home from '../pages/home';
import {BaseContainer} from "../components";

export default class App extends React.Component<ScreenProps<>> {
  render() {
    return (
<BaseContainer title="Chat" navigation={this.props.navigation} header> 
<AppStackNavigator /> 
</BaseContainer>
    );
  }
  
}




const AppStackNavigator = StackNavigator({

  home: {screen: Home},
  firebasePage: {screen: FirebasePage},

})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





AppRegistry.registerComponent('PushNotifiction', () => App);

AppRegistry.registerComponent('firebaseAuth', () => App);