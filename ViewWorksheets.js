/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  AlertIOS,
  TouchableHighlight
} from 'react-native';
import Worksheet from './worksheet';

class ViewWorksheets extends Component {

  constructor(props, context) {
    super(props, context);
  
    this.state = {
    	worksheets: []
    };
    this.getWorksheets = this.getWorksheets.bind(this);
    
  }

 
  getWorksheets() {
    fetch("http://localhost:3000/api/Worksheets?access_token=iTk6s6Boej92VgEFrKNnvg4rqD1uXjZmAUoNtHKgIqOwxi0LpnEToMK8SKYcjXuC")
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({worksheets: responseData});
    })
    .done();
  }
  
  componentDidMount() {
  	this.getWorksheets()
  }


  render() {

     var viewWorksheet = function(worksheet) {   
      this.props.navigator.push({
        title: worksheet.title,
        component: Worksheet,
        passProps: { worksheetId: worksheet.id }
      });
    }.bind(this)

  	var worksheets = this.state.worksheets.map(function(worksheet) {
  		return (
  			 <TouchableHighlight key={worksheet.id}  onPress={() => viewWorksheet(worksheet)}>
            		<View style={styles.worksheet}>
            			<Text style={styles.welcome} >{worksheet.title}</Text>
            		</View>
          </TouchableHighlight>
  		); 
  	});

    return (
      <ScrollView style={{backgroundColor: '#F3F3F3'}}>
        {worksheets}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  worksheet: {
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

AppRegistry.registerComponent('ViewWorksheets', () => ViewWorksheets);

module.exports = ViewWorksheets;
