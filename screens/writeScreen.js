import React from 'react';
import { Text, TextInput, Dimensions, TouchableOpacity, Platform, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../config';
import firebase from 'firebase';

export default class writeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			author : "",
			name : "",
			story : "",
			stories : []
		}
	}
	addStoryOnline=async(author,name,story,timestamp,uid)=>{ //firebase
		db.ref('stories/all/'+uid+'/'+name).update({
			contents : story,
			timestamp : timestamp,
			author : author, // to assist search function
			name : name // also to assist search function
		});
	}
	displayToast=()=>{
		if(Platform.OS === "android") {
			ToastAndroid.showWithGravity("Your story has been submitted!",ToastAndroid.SHORT,ToastAndroid.TOP);
		}
	}
	replaceText=(text)=>{
		text = text.replace('.','').replace('$','').replace('[','').replace(']','').replace('#','').replace('/','');
		return text;
	}
	render() {
		const behavior = Platform.OS === "ios" ? "position" : "";
		return (
				<KeyboardAvoidingView style={{flex : 1, alignContent : 'center'}} behavior={behavior} enabled>
					<TextInput
						style = {{
							width : Dimensions.get('window').width*0.9,
							borderWidth : 2,
							borderColor : '#000000',
							alignSelf : 'center',
							margin : 10,
							marginTop : Dimensions.get('window').height*0.15
						}}
						onChangeText = {
							text => {
								text = this.replaceText(text);
								this.setState({ author : text });
							}
						}
						value = {
							this.state.author
						}
						placeholder = {
							"Enter your name here!"
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
								text = this.replaceText(text);
								this.setState({ name : text });
							}
						}
						value = {
							this.state.name
						}
						placeholder = {
							"Enter your story name here!"
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
						placeholder = {
							"Enter your own story here!"
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
						onPress = {async()=>{/*this.addStory(this.state.story)*/
							var timestamp =  Date.now();
							await this.addStoryOnline(this.state.author,this.state.name,this.state.story,timestamp,firebase.auth().currentUser.uid);
							this.displayToast();
						}}
					>
						<Text style={{alignSelf : 'center'}}>Submit</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
		)
	}
}