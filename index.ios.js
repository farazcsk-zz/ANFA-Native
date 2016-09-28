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
  }

  alertTest() {
    AlertIOS.prompt(
      'Enter a value',
      null,
      text => console.log("You entered "+text)
    );
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
          onChangeText={(text) => this.setState({username: text})}
          multiline={true}
          placeholder='Password'
        />
        <TouchableHighlight  onPress={this.alertTest}>
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
