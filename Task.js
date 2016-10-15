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
import { RadioButtons } from 'react-native-radio-buttons';


class Task extends Component {

	constructor(props, context) {
		super(props, context);  

		this.state = {
			task: {
				name: '',
				type: '',
				instructions: '',
				answer: '',
				wrongAnswers: ["", "", ""]
			}
		};

		this.setModalVisible = this.setModalVisible.bind(this);
	}

	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.taskId !== this.props.taskId){
			fetch("http://localhost:3000/api/Tasks/" + nextProps.taskId +"?access_token=TbZ4UnDIN1jbRJ1xzVf5mTbEGkjR2kXZjEEeYVqiwHIwgytpFsjYCklHdIrzxBCW")
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({task: responseData});
				// AlertIOS.alert(
				//   "POST Response",
				//   "Response Body -> " + JSON.stringify(responseData)
				// )
				// this.htmlCode = this.state.worksheet.sections[0].tasks[0].instructions;
			})
			.done();
		}
		 
	}

	render() {
		const options = [
			this.state.task.answer,
			this.state.task.wrongAnswers[0],
			this.state.task.wrongAnswers[1],
			this.state.task.wrongAnswers[2]
		]

		function setSelectedOption(selectedOption){
		    this.setState({
		      selectedOption
		    });
		  }
		 
		function renderOption(option, selected, onSelect, index){
		    const style = selected ? { fontWeight: 'bold'} : {};
		 
		    return (
		      <TouchableHighlight onPress={onSelect} key={index}>
		        <Text style={style}>{option}</Text>
		      </TouchableHighlight>
		    );
		  }
		 
	    function renderContainer(optionNodes){
			return <View>{optionNodes}</View>;
	    }
		return (
			<ScrollView style={styles.container}>
				<View style={styles.instructions}>
					<Text>{this.state.task.name}</Text>
					<Text>{this.props.sectionIndex}</Text>
					<Text>{this.props.taskIndex}</Text>
					<WebView
						source={{html: this.state.task.instructions}}
					/>
				</View>
				
				{this.state.task.type != 'Learn' ? 
					<View style={{margin: 20}}>
				      <RadioButtons
				        options={ options }
				        onSelection={ setSelectedOption.bind(this) }
				        selectedOption={this.state.selectedOption }
				        renderOption={ renderOption }
				        renderContainer={ renderContainer }
				      />
				      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
				    </View>
				: null }

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('Task', () => Task);

module.exports = Task;
