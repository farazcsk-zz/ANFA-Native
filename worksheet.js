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
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';
import Button from 'react-native-button';
import * as Animatable from 'react-native-animatable';
import Task from './Task';
import ViewWorksheets from './ViewWorksheets';


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
			currentTaskIndex: 0,
			possibleScore: 0,
			totalScore: 0,
			correctAnswers: [],
			end: false
		};

		this.setModalVisible = this.setModalVisible.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.checkTask = this.checkTask.bind(this);
		this.setScore = this.setScore.bind(this);
	}

	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
    	if(visible == !this.state.modalVisible){
    		this.props.navigator.pop();
    	}
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

	setScore(score) {
		this.setState({totalScore: parseInt(JSON.stringify(score))})
		this.setModalVisible();
	}

	checkTask() {
		if(this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].type != 'Learn') {
			var correctAnswers = this.state.correctAnswers;
			correctAnswers.push(this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].answer)
			this.setState({
				possibleScore: this.state.possibleScore +=1,
				correctAnswers: correctAnswers
			})
		}
	}

	handleNext(){
		this.checkTask();
		if (this.state.worksheet.sections.length == this.state.currentSectionIndex + 1) {
			if(this.state.currentTaskIndex + 1 < this.state.worksheet.sections[this.state.currentSectionIndex].tasks.length) {
				this.setState({
					currentTaskIndex: this.state.currentTaskIndex += 1,
					currentTaskId: this.state.worksheet.sections[this.state.currentSectionIndex].tasks[this.state.currentTaskIndex].id
				})
			} else {
				this.setState({end: true})
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
					correctAnswers={this.state.correctAnswers}
					end={this.state.end}
					setScore={this.setScore}
				/>
				<Modal
		        	animationType={"slide"}
		        	transparent={false}
		        	visible={this.state.modalVisible}
		        	onRequestClose={() => {AlertIOS.alert(
			  			"YOU ARE DONE BRUV",
			  			"->"
					)}}
		        >
		        	<ScrollView style={styles.modal}>
		        		<Text style={styles.score}>You have completed:</Text>
		        		<Text style={styles.score}>{this.state.worksheet.title}</Text>
		        		<View style={styles.line}></View>
		        		<Text style={styles.score}>See how you did below: </Text>
	            		<Text style={styles.score}>{this.state.totalScore}/{this.state.possibleScore}</Text>

			            <TouchableHighlight underlayColor='#36BA93' onPress={() => {
			              this.setModalVisible(!this.state.modalVisible)
			            }}>
		              		<Text style={styles.finish}>FINISH</Text>
		            	</TouchableHighlight>

		         	</ScrollView>
        		</Modal>
        		<Button containerStyle={styles.button} onPress={this.handlePrevious}>
					<Text style={{color: '#36333C', fontFamily: 'Roboto-Medium'}}>PREVIOUS</Text>
				</Button>
				<Button containerStyle={styles.button} onPress={this.handleNext}>
					<Text style={{color: '#36333C', fontFamily: 'Roboto-Medium'}}>NEXT</Text>
				</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	score: {
		marginTop: 5,
		marginBottom: 5,
		color: '#FFFFFF',
		fontSize: 50,
		fontFamily: 'roboto-boldItalic',
		textAlign: 'center',
	},
	finish: {
		marginTop: 5,
		marginBottom: 5,
		color: '#36BA93',
		fontSize: 50,
		fontFamily: 'roboto-boldItalic',
		textAlign: 'center',
	},
	line: {
		borderWidth: 1,
		borderColor: '#FFFFFF',
		marginTop: 5,
		marginBottom: 5
	},
	modal: {
		backgroundColor: '#393939',
		padding:20,
		paddingTop: 50,
	},
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
