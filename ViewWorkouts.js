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

  constructor(props, context) {
    super(props, context);
  
    this.state = {
    	workouts: []
    };
    this.getWorkouts = this.getWorkouts.bind(this);
  }

  getWorkouts() {
    fetch("http://localhost:3000/api/Workouts?filter=%7B%22limit%22%3A%20%2210%22%7D&access_token=iTk6s6Boej92VgEFrKNnvg4rqD1uXjZmAUoNtHKgIqOwxi0LpnEToMK8SKYcjXuC")
    .then((response) => response.json())
    .then((responseData) => {
      // AlertIOS.alert(
      //   "POST Response",
      //   "Response Body -> " + JSON.stringify(responseData)
      // )
      this.setState({workouts: responseData});
    })
    .done();
  }
  
  render() {
  	this.getWorkouts()
	var workouts = this.state.workouts.map(function(workout) {
		return (
			<Text style={styles.welcome} >{workout.title}</Text>
		); 
	});
    return (
      <View style={styles.workout}>
        {workouts}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: '#36333C'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('ViewWorkouts', () => ViewWorkouts);

module.exports = ViewWorkouts;
