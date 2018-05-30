import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  View, 
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import ActionButton from '../components/ActionButton';


import {DrawerNavigator} from 'react-navigation';
import styles from '../pages/styles';


export default class Home extends Component {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
    gesturesEnabled: false
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      navigate: this.props.navigation.navigate,
    };
    this.onSubmit=this.onSubmit.bind(this)
  }

 componentWillMount(){
    AsyncStorage.getItem('userName').then((value) => {
      this.setState({user: value})
    }).done();
  }

  onSubmit(){
    if(this.state.text !='') {
      AsyncStorage.setItem('userName', this.state.text);
      this.state.navigate('firebasePage');
    }
  }
  render(){
    return (
     <View style={styles.homeContainer}>
        <Text style={styles.titleText}>Jones Family Team</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={"Enter your name"}
        />
        <ActionButton onPress={this.onSubmit} title="SUBMIT" />
      </View>
    )
  }
}
