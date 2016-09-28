/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AlertIOS,
  TouchableHighlight
} from 'react-native';

class iosTest extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: ''
    };

    this.alertTest = this.alertTest.bind(this);
    this.login = this.login.bind(this);
  }

  alertTest() {
    AlertIOS.prompt(
      'Enter a value',
      null,
      text => console.log("You entered "+text)
    );
  }

  login() {
    fetch("http://localhost:3000/api/Accounts/login", {
      method: "POST",
      headers:{
        "Accept": "application/json", 
        "Content-Type": "application/json" 
      }, 
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
        "POST Response",
        "Response Body -> " + JSON.stringify(responseData)
      )
    })
    .done();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          WORKOUT
        </Text>
        <Text style={styles.instructions}>
          Please login below
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'white', borderBottomColor:'grey', borderWidth: 1, margin: 10}}
          onChangeText={(text) => this.setState({username: text})}
          multiline={true}
          placeholder='Username'
        />
         <TextInput
          style={{height: 40, borderColor: 'white', borderBottomColor:'grey', borderWidth: 1, margin: 10}}
          onChangeText={(text) => this.setState({password: text})}
          multiline={true}
          placeholder='Password'
        />
        <TouchableHighlight  onPress={this.login}>
          <Image
            style={{width: 50, height: 50, margin: 10}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iosTest', () => iosTest);
