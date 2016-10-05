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
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';


class Workout extends Component {

  constructor(props, context) {
    super(props, context);  

    this.state = {
      workout: {}
    };
  }
  
  componentDidMount() {
     fetch("http://localhost:3000/api/Workouts/" + this.props.workoutId +"?filter=%7B%22include%22%3A%7B%22relation%22%3A%22sets%22%7D%7D&access_token=TbZ4UnDIN1jbRJ1xzVf5mTbEGkjR2kXZjEEeYVqiwHIwgytpFsjYCklHdIrzxBCW")
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({workout: responseData});
    })
    .done();
  }
  render() {
    return (
    	<View style={styles.container}>
           <Text style={styles.welcome}>{this.state.workout.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Workout', () => Workout);

module.exports = Workout;
