/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
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
import Workout from './workout';

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

     var viewWorkout = function(workout) {   
      this.props.navigator.push({
        title: workout.title,
        component: Workout,
        passProps: { workoutId: workout.id }
      });
    }.bind(this)

  	var workouts = this.state.workouts.map(function(workout) {
  		return (
  			 <TouchableHighlight key={workout.id}  onPress={() => viewWorkout(workout)}>
            		<View style={styles.workout}>
            			<Text style={styles.welcome} >{workout.title}</Text>
            		</View>
          </TouchableHighlight>
  		); 
  	});

    return (
      <View style={{backgroundColor: '#F3F3F3'}}>
        {workouts}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workout: {
    flex: 0.5,
    margin: 10,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#36333C'
  },
  welcome: {
    fontSize: 10,
    padding:15
  },
});

AppRegistry.registerComponent('ViewWorkouts', () => ViewWorkouts);

module.exports = ViewWorkouts;
