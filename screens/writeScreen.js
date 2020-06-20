import React from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../config';

export default class writeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			author : "Enter your name here!",
			name : "Enter your story name here!",
			story : "Enter your own story here!",
			stories : []
		}
	}
	addStory=async(story)=>{ //local storage
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
	addStoryOnline=async(author,name,story,timestamp)=>{ //firebase
		db.ref('stories/all/'+author+'/'+name).update({
			contents : story,
			timestamp : timestamp
		});
	}
	render() {
		return (
			<View style={{flex : 1, alignContent : 'center'}}>
				<TextInput
					style = {{
						width : Dimensions.get('window').width*0.9,
						borderWidth : 2,
						borderColor : '#000000',
						alignSelf : 'center',
						margin : 10
					}}
					onChangeText = {
						text => {
							this.setState({ author : text });
						}
					}
					value = {
						this.state.author
					}
				/>
				<TextInput
					style = {{
						width : Dimensions.get('window').width*0.9,
						borderWidth : 2,
						borderColor : '#000000',
						alignSelf : 'center',
						margin : 10
					}}
					onChangeText = {
						text => {
							this.setState({ name : text });
						}
					}
					value = {
						this.state.name
					}
				/>
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
					onPress = {()=>{/*this.addStory(this.state.story)*/
						var timestamp =  Date(); //I could not find a server to get a timestamp, so I had to use the local version
						this.addStoryOnline(this.state.author,this.state.name,this.state.story,timestamp);
					}}
				>
					<Text style={{alignSelf : 'center'}}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}