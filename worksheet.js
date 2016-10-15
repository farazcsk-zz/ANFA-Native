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
	ScrollView,
	Image,
	AlertIOS,
	TouchableHighlight,
	NavigatorIOS,
	WebView,
	Modal
} from 'react-native';
import Task from './Task';


class Worksheet extends Component {

	constructor(props, context) {
		super(props, context);  

		this.state = {
			worksheet: {
				sections:[]
			},
			modalVisible: false,
			currentTaskId: ''
		};

		this.setModalVisible = this.setModalVisible.bind(this);
	}

	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
	
	componentDidMount() {
		 fetch("http://localhost:3000/api/Worksheets/" + this.props.worksheetId +"?filter=%7B%22include%22%3A%7B%22relation%22%3A%22sections%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%2C%22include%22%3A%7B%22relation%22%3A%22tasks%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%7D%7D%7D%7D%7D&access_token=TbZ4UnDIN1jbRJ1xzVf5mTbEGkjR2kXZjEEeYVqiwHIwgytpFsjYCklHdIrzxBCW")
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({worksheet: responseData, currentTaskId: responseData.sections[0].tasks[0].id});
			// AlertIOS.alert(
			//   "POST Response",
			//   "Response Body -> " + JSON.stringify(responseData)
			// )
			// this.htmlCode = this.state.worksheet.sections[0].tasks[0].instructions;
			this.setState({html: this.state.worksheet.sections[0].tasks[0].instructions });
			this.setState({answer: this.state.worksheet.sections[0].tasks[0].answer });
			this.setState({wrongAnswers: this.state.worksheet.sections[0].tasks[0].wrongAnswers });

		})
		.done();
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Task
					taskId={this.state.currentTaskId} 
				/>
				<Modal
		        	animationType={"slide"}
		        	transparent={false}te
		        	visible={this.state.modalVisible}
		        	onRequestClose={() => {alert("Modal has been closed.")}}
		        >
		        	<View style={{marginTop: 22}}>
		        		<View>
		            		<Text>Hello World!</Text>

				            <TouchableHighlight onPress={() => {
				              this.setModalVisible(!this.state.modalVisible)
				            }}>
			              		<Text>Hide Modal</Text>
			            	</TouchableHighlight>

		          		</View>
		         	</View>
        		</Modal>
        		<TouchableHighlight style={styles.button} underlayColor='#36BA93'>
					<Text style={{color: '#36333C'}}>PREVIOUS</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.button} underlayColor='#36BA93'>
					<Text style={{color: '#36333C'}}>NEXT</Text>
				</TouchableHighlight>
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
	},
	instructions: {
		height: 250,
		margin: 10,
		marginTop: 50,
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
