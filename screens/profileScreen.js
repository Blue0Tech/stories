import React from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import * as firebase  from 'firebase';

export default class profileScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn : false,
            email : "",
            password : ""
        };
    }
    checkLoggedIn=async()=>{
        console.log("checking logged in");
        var loggedIn = this.state.loggedIn;
        await firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
            loggedIn = true;
            } else {
            loggedIn = false;
            }
        });
        console.log(loggedIn);
        this.setState({
            loggedIn : loggedIn
        });
    }
    signin=async(email,password)=>{
        await firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            Alert.alert("success");
            console.log("success");
        }).catch((error)=>{
            Alert.alert(error.message);
            console.error(error.message);
        });
    await this.checkLoggedIn();
    }
    signup=async(email,password)=>{
        await firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
            Alert.alert("success");
            console.log("success");
        }).catch((error)=>{
            Alert.alert(error.message);
            console.error(error.message);
        });
    }
    signout=async()=>{
        await firebase.auth().signOut().then(()=>{
            Alert.alert("success");
            console.log("success");
        }).catch((error)=>{
            Alert.alert(error.message);
            console.error(error.message);
        });
    await this.checkLoggedIn();
    }
    render() {
        if(this.state.loggedIn) {
            return (
                <View>
                    <TouchableOpacity
                        style = {{
                            alignSelf : 'center',
                            width : Dimensions.get('window').width*0.4,
                            height : 20,
                            alignContent : 'center',
                            justifyContent : 'center',
                            backgroundColor : '#a8b61e'
                        }}
                        onPress={()=>{this.signout()}}
                    >
                        <Text>Sign out</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TextInput
                        style = {{
							width : Dimensions.get('window').width*0.9,
							borderWidth : 2,
							borderColor : '#000000',
							alignSelf : 'center',
							margin : 10
						}}
                        onChangeText={
                            email => {
                                this.setState({ email : email });
                            }
                        }
                        value={this.state.email}
                        placeholder = {
                            "Enter your email"
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
                        onChangeText={
                            password => {
                                this.setState({ password : password });
                            }
                        }
                        value={this.state.password}
                        placeholder = {
                            "Enter your password"
                        }
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style = {{
							alignSelf : 'center',
							width : Dimensions.get('window').width*0.4,
							height : 20,
							alignContent : 'center',
							justifyContent : 'center',
                            backgroundColor : '#a8b61e',
                            margin : 10
                        }}
                        onPress={()=>{this.signin(this.state.email,this.state.password)}}
                    >
                        <Text style={{alignSelf : 'center'}}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{
							alignSelf : 'center',
							width : Dimensions.get('window').width*0.4,
							height : 20,
							alignContent : 'center',
							justifyContent : 'center',
                            backgroundColor : '#a8b61e',
                            margin : 10
                        }}
                        onPress={()=>{this.signup(this.state.email,this.state.password)}}
                    >
                        <Text style={{alignSelf : 'center'}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}