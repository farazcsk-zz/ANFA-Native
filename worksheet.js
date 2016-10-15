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
			currentTaskId: '',
			currentSectionIndex: 0,
			currentTaskIndex: 0
		};

		this.setModalVisible = this.setModalVisible.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
	}

	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
	
	componentDidMount() {
		 fetch("http://localhost:3000/api/Worksheets/" + this.props.worksheetId +"?filter=%7B%22include%22%3A%7B%22relation%22%3A%22sections%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%2C%22include%22%3A%7B%22relation%22%3A%22tasks%22%2C%22scope%22%3A%7B%22order%22%3A%22number%20ASC%22%7D%7D%7D%7D%7D&access_token=TbZ4UnDIN1jbRJ1xzVf5mTbEGkjR2kXZjEEeYVqiwHIwgytpFsjYCklHdIrzxBCW")
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				worksheet: responseData, 
				currentTaskId: responseData.sections[0].tasks[0].id, 
				currentSectionIndex: 0, 
				currentTaskIndex: 0
			});
			// AlertIOS.alert(
			//   "POST Response",
			//   "Response Body -> " + JSON.stringify(responseData)
			// )
			// this.htmlCode = this.state.worksheet.sections[0].tasks[0].instructions;

		})
		.done();
	}

	handleNext(){
		if (this.state.worksheet.sections.length == this.state.currentSectionIndex + 1) {
			if(this.state.currentTaskIndex + 1 < this.state.worksheet.sections[this.state.currentSectionIndex].tasks.length) {
				this.setState({
					currentTaskIndex: this.state.currentTaskIndex += 1, 
					currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
				})
			}
		} else if(this.state.worksheet.sections[this.state.currentSectionIndex].tasks.length == this.state.currentTaskIndex + 1) {
			this.setState({ 
				currentSectionIndex: this.state.currentSectionIndex += 1, 
				currentTaskIndex: this.state.currentTaskIndex = 0,  
				currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
			});
		} else {
			this.setState({
				currentTaskIndex: this.state.currentTaskIndex += 1, 
				currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
			})
		}
	}

	handlePrevious(){
		if (this.state.currentSectionIndex === 0) { 
			if(this.state.currentTaskIndex != 0) {
				this.setState({
					currentTaskIndex: this.state.currentTaskIndex -= 1, 
					currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
				})
			}
		} else if (this.state.currentTaskIndex === 0) {
			this.setState({
				currentSectionIndex: this.state.currentSectionIndex -= 1,
				currentTaskIndex: this.state.worksheet.sections[this.state.currentSectionIndex].tasks.length - 1,
				currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.worksheet.sections[this.state.currentSectionIndex].tasks.length - 1].id
			})
		} else {
			this.setState({
				currentTaskIndex: this.state.currentTaskIndex -= 1, 
				currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
			})
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Task
					taskId={this.state.currentTaskId}
					taskIndex={this.state.currentTaskIndex}
					sectionIndex={this.state.currentSectionIndex} 
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
        		<TouchableHighlight style={styles.button} underlayColor='#36BA93' onPress={this.handlePrevious}>
					<Text style={{color: '#36333C', fontFamily: 'Roboto-Medium'}}>PREVIOUS</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.button} underlayColor='#36BA93' onPress={this.handleNext}>
					<Text style={{color: '#36333C', fontFamily: 'Roboto-Medium'}}>NEXT</Text>
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
