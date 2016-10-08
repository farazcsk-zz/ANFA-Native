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
import Login from './login';

export default class ANFANative extends Component {

  constructor(props) {
    super(props);  
  }

 
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Login,
          title: 'Login',
        }}
        style={{flex: 1}}
        barTintColor='#36BA93'
        tintColor='#FFFFFF'
        titleTextColor='#FFFFFF'
      />
    );
  }
}



AppRegistry.registerComponent('ANFANative', () => ANFANative);
