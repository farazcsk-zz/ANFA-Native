/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
	LayoutAnimation,
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
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
import Button from 'react-native-button';
import * as Animatable from 'react-native-animatable';

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
			//  AlertIOS.alert(
			//   "POST Response",
			//   "Response Body -> " + JSON.stringify(responseData)
			// )
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

		var worksheets = this.state.worksheets.map(function(worksheet, index) {
			return (
				<Animatable.View animation="slideInRight" delay={index * 100} duration={375} key={worksheet.id}>
					<Card styles={card}>
						<TouchableHighlight onPress={() => viewWorksheet(worksheet)} underlayColor='#36BA93' activeOpacity={0.25}>
							<Text style={styles.welcome} >{worksheet.title}</Text>
						</TouchableHighlight>
					</Card>
				</Animatable.View>
			);
		});

		return (
			<ScrollView style={{backgroundColor: '#F3F3F3'}}>
				{worksheets}
			</ScrollView>
		);
	}
}
const card = {
		card: {
			flex: 0.5,
			margin: 10,
			borderRadius: 0,
			borderWidth: 2,
			borderColor: '#36333C',
			backgroundColor: 'transparent'
		}
}
const styles = StyleSheet.create({
	welcome: {
		fontSize: 10,
		padding:15,
		fontFamily: 'Roboto-Medium'
	},
});

AppRegistry.registerComponent('ViewWorksheets', () => ViewWorksheets);

module.exports = ViewWorksheets;
