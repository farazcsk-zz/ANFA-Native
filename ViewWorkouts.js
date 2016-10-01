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

class ViewWorkouts extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
    };
    this.getWorkouts = this.getWorkouts.bind(this);
  }

  getWorkouts() {
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
      // AlertIOS.alert(
      //   "POST Response",
      //   "Response Body -> " + JSON.stringify(responseData)
      // )
    })
    .done();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
           MY WORKOUTS
        </Text>
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

AppRegistry.registerComponent('ViewWorkouts', () => ViewWorkouts);

module.exports = ViewWorkouts;
