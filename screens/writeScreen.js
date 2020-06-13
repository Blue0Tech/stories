import React from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class writeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			story : "Enter your own story here!",
			stories : []
		}
	}
	addStory=async(story)=>{
		var stories = await AsyncStorage.getItem("stories");
		if(!stories) {
			var object = ["This is a sample story"];
			object = JSON.stringify(object);
			await AsyncStorage.setItem("stories",object);
			stories = await AsyncStorage.getItem("stories");
		}
		console.log(stories);
		stories = JSON.parse(stories);
		stories.push(story);
		console.log(stories);
		stories = JSON.stringify(stories);
		await AsyncStorage.setItem("stories",stories);
	}
	render() {
		return (
			<View style={{flex : 1, alignContent : 'center'}}>
				<TextInput
					multiline = {true}
					style = {{
						width : Dimensions.get('window').width*0.9,
						height : Dimensions.get('window').height*0.4,
						borderWidth : 2,
						borderColor : '#000000',
						alignSelf : 'center',
						margin : 10
					}}
					onChangeText = {
						text => {
							this.setState({ story : text });
						}
					}
					value = {
						this.state.story
					}
				/>
				<TouchableOpacity
					style = {{
						alignSelf : 'center',
						width : Dimensions.get('window').width*0.4,
						height : 20,
						alignContent : 'center',
						justifyContent : 'center',
						backgroundColor : '#a8b61e'
					}}
					onPress = {()=>{this.addStory(this.state.story)}}
				>
					<Text style={{alignSelf : 'center'}}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}