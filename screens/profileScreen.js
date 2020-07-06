import React from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import db from '../config';

export default class profileScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn : false,
            email : "",
            password : ""
        }
    }
    checkLoggedIn=async()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              this.setState({
                  loggedIn : true
              });
            } else {
              this.setState({
                  loggedIn : false
              });
            }
          });
    }
    signin=async(email,password)=>{
        db.auth().signInWithEmailAndPassword(email,password).then(()=>{
            alert("success");
        }).catch((error)=>{
            alert(error.message);
        });
    }
    signup=async(email,password)=>{
        db.auth().createUserWithEmailAndPassword(email,password).then(()=>{
            alert("success");
        }).catch((error)=>{
            alert(error.message);
        });
    }
    signout=async()=>{
        db.auth().signOut().then(()=>{
            alert("success");
        }).catch((error)=>{
            alert(error.message);
        });
    }
    render() {
        if(this.state.loggedIn) {
            return (
                <View>
                    <TouchableOpacity>
                    style = {{
                        alignSelf : 'center',
                        width : Dimensions.get('window').width*0.4,
                        height : 20,
                        alignContent : 'center',
                        justifyContent : 'center',
                        backgroundColor : '#a8b61e'
                    }}
                    onPress={()=>{this.signout()}}
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