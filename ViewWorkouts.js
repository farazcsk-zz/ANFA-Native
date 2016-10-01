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
      this.setState({workouts: responseData});
    })
    .done();
  }
  
  componentDidMount() {
  	this.getWorkouts()
  }
  
  render() {
	var workouts = this.state.workouts.map(function(workout) {
		return (
			 <TouchableHighlight  key={workout.id}>
          		<View style={styles.workout}>
          			<Text style={styles.welcome} >{workout.title}</Text>
          		</View>
        	</TouchableHighlight>
		); 
	});
    return (
      <View>
        {workouts}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workout: {
    flex: 0.5,
    margin: 15,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#36333C'
  },
  welcome: {
    fontSize: 10,
    padding:10
  },
});

AppRegistry.registerComponent('ViewWorkouts', () => ViewWorkouts);

module.exports = ViewWorkouts;
