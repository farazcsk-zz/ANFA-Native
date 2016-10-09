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
  NavigatorIOS,
  WebView
} from 'react-native';


class Worksheet extends Component {

  constructor(props, context) {
    super(props, context);  

    this.state = {
      worksheet: {
        sections:[]
      },
      html: ''
    };
  }
  
  componentDidMount() {
     fetch("http://localhost:3000/api/Worksheets/" + this.props.worksheetId +"?filter=%7B%22include%22%3A%7B%22relation%22%3A%22sections%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%2C%22include%22%3A%7B%22relation%22%3A%22tasks%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%7D%7D%7D%7D%7D&access_token=TbZ4UnDIN1jbRJ1xzVf5mTbEGkjR2kXZjEEeYVqiwHIwgytpFsjYCklHdIrzxBCW")
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({worksheet: responseData});
      // AlertIOS.alert(
      //   "POST Response",
      //   "Response Body -> " + JSON.stringify(responseData)
      // )
      // this.htmlCode = this.state.worksheet.sections[0].tasks[0].instructions;
      this.setState({html: this.state.worksheet.sections[0].tasks[0].instructions });
    })
    .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.instructions}>
          <WebView
            source={{html: this.state.html}}
            style={{marginTop: 50}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    height: 250,
    margin: 10,
    marginTop: 100,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#36BA93',
    shadowColor: 'rgba(0, 0, 0, 0.117647)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  },
  container: {
    backgroundColor: '#F3F3F3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Worksheet', () => Worksheet);

module.exports = Worksheet;
