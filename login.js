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
	ScrollView,
	Image,
	AlertIOS,
	TouchableHighlight
} from 'react-native';
import ViewWorksheets from './ViewWorksheets';


class Login extends Component {

	constructor(props, context) {
		super(props, context);
	
		this.state = {
			details:{
				username: '',
				password: ''
			},
		};

		this.alertTest = this.alertTest.bind(this);
		this.login = this.login.bind(this);
	}

	alertTest() {
		AlertIOS.prompt(
			'Enter a value',
			null,
			text => console.log("You entered "+text)
		);
	}

	login() {
		fetch("http://localhost:3000/api/Accounts/login", {
			method: "POST",
			headers:{
				"Accept": "application/json", 
				"Content-Type": "application/json" 
			}, 
			body: JSON.stringify({
				username: this.state.details.username, 
				password: this.state.details.password
			})
		})
		.then((response) => response.json())
		.then((responseData) => {
			// AlertIOS.alert(
			//   "POST Response",
			//   "Response Body -> " + JSON.stringify(responseData)
			// )
			this.props.navigator.push({
				title: 'Worksheets',
				component: ViewWorksheets,
			});

		})
		.done();
	}
	
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.login}>
					<Text style={styles.welcome}>
						ANFA
					</Text>
					<Text style={styles.instructions}>
						Please login to continue
					</Text>
					<TextInput
						style={{height: 40, borderColor: 'transparent', borderBottomColor:'#36333C', borderWidth: 1, margin: 10, fontFamily: 'Roboto-Light'}}
						onChangeText={(text) => this.setState({details:{username: text, password: this.state.details.password}})}
						multiline={true}
						autoCapitalize='none'
						placeholder='Username'
					/>
					 <TextInput
						style={{height: 40, borderColor: 'transparent', borderBottomColor:'#36333C', borderWidth: 1, margin: 10, fontFamily: 'Roboto-Light'}}
						onChangeText={(text) => this.setState({details:{username:this.state.details.username, password: text}})}
						multiline={true}
						autoCapitalize='none'
						placeholder='Password'
					/>
					<TouchableHighlight style={styles.button} onPress={this.login} underlayColor='#36BA93'>
						<Text style={{color: '#36333C', fontFamily: 'Roboto-Medium'}}>LOGIN</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: '#36BA93',
		padding: 10,
		margin: 10,
		shadowColor: 'rgba(0, 0, 0, 0.117647)',
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 2
		},
	},

	login: {
		marginTop:150,
		margin: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderWidth: 2,
		borderColor: '#36BA93',
		shadowColor: 'rgba(0, 0, 0, 0.117647)',
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 2
		},
	},

	container: {
		backgroundColor: '#F3F3F3'
	},

	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		fontFamily: 'Roboto-Medium'
	},

	instructions: {
		textAlign: 'center',
		color: '#36333C',
		marginBottom: 5,
		fontFamily: 'Roboto-Light'
	},
});

AppRegistry.registerComponent('Login', () => Login);

module.exports = Login;
