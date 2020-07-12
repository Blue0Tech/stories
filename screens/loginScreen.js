import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : ""
        }
    }
    login=async(email,password)=>{
        if(email&&password) {
            try {
                console.log("inside if");
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response) {
                    console.log("successful");
                    this.props.navigation.navigate('TabNavigator');
                }
            }
            catch(error) {
                switch(error.code) {
                    case 'auth/user-not-found':
                        Alert.alert("User does not exist!");
                        console.error("User does not exist!");
                    break;
                    case 'auth/invalid-email':
                        Alert.alert("Incorrect email or password!");
                        console.error("Incorrect email or password!");
                    break;
                    case 'auth/wrong-password':
                        Alert.alert("Incorrect email or password!");
                        console.error("Incorrect email or password!"); // both the same message for security
                    break;
                    case 'auth/network-request-failed':
                        Alert.alert("Could not connect to the database. Check your internet connection.");
                        console.error("Could not correct to the database. Check your internet connection");
                    default:
                        Alert.alert("Unknown error!");
                        console.error("Unknown error!");
                    break;
                };
            }
        } else {
            Alert.alert("Enter email and password!");
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={{alignItems : 'center', marginTop : 10}}>
                <View>
                    <TextInput style={styles.loginBox}
                        placeholder={"abc@example.com"}
                        keyboardType={"email-address"}
                        onChangeText={
                            (text) => {
                                this.setState({
                                    email : text
                                });
                            }
                        }/>
                    <TextInput style={styles.loginBox}
                        placeholder={"Enter Password"}
                        secureTextEntry={true}
                        onChangeText={
                            (text) => {
                                this.setState({
                                    password : text
                                });
                            }
                        }/>
                </View>
                <View>
                    <TouchableOpacity style={{height : 30, width : 90, borderWidth : 1, margin : 20, justifyContent : 'center'}}
                        onPress={()=>{this.login(this.state.email,this.state.password)}}>
                        <Text style={{textAlign : 'center'}}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin:10,
        paddingLeft:10
    }
});