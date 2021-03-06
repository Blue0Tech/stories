import React from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Alert, StatusBar, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import * as firebase  from 'firebase';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class profileScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn : false,
            email : "",
            password : "",
            displayName : ""
        };
    }
    componentDidMount() {
        this.checkLoggedIn();
    }
    checkLoggedIn=async()=>{
        console.log("checking logged in");
        var loggedIn = this.state.loggedIn;
        await firebase.auth().onAuthStateChanged(function(user) {
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
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            Alert.alert("Signed in!");
            console.log("success");
        }).catch((error)=>{
            Alert.alert("Error",error.message);
            console.error(error.message);
        });
        await this.checkLoggedIn();
        console.log(firebase.auth().currentUser);
    }
    signup=async(email,password,name)=>{
        await firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
            this.verifyEmail();
            Alert.alert("Check your email","Please check you email to verify your account.");
            console.log("Please check you email to verify your account.");
        }).catch((error)=>{
            Alert.alert("Error",error.message);
            console.error(error.message);
        });
        await this.checkLoggedIn();
    }
    signout=async()=>{
        await firebase.auth().signOut().then(()=>{
            Alert.alert("Signed out!");
            console.log("success");
        }).catch((error)=>{
            Alert.alert("Error",error.message);
            console.error(error.message);
        });
    await this.checkLoggedIn();
    }
    verifyEmail=async()=>{
        await firebase.auth().currentUser.sendEmailVerification();
    }
    changeName=async(name)=>{
        await firebase.auth().currentUser.updateProfile({
            displayName : name
        }).catch((e)=>{
            if(Platform.OS) {
                Alert.alert("Error","There was an error updating your details.");
            } else {
                alert("There was an error updating your details!");
            }
        });
    }
    updateNameOnAllStories=async()=>{
        try {
            var uid = await firebase.auth().currentUser.uid;
            var name = await firebase.auth().currentUser.displayName;
            var data;
            var path='stories/all/'+uid;
            await db.ref(path).orderByKey().on('value',(all)=>{
                data = all.val();
            });
            for(var x in data) {
                data[x].author=name;
            }
            await db.ref('stories/all').update({
                [uid] : data
            });
        }
        catch(e) {
            if(Platform.OS) {
                Alert.alert("Error!","There was an error updating your name");
            } else {
                alert("There was an error updating your name");
            }
        }
    }
    resetPassword=(email)=>{
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
            if(Platform.OS) {
                Alert.alert("Follow the instructions in your email");
            } else {
                alert("Follow the instructions in your email");
            }
        }).catch((e)=>{
            if(Platform.OS) {
                Alert.alert("Error",e.message);
            } else {
                alert(e.message);
            }
        });
    }
    render() {
        if(this.state.loggedIn) {
            return (
                    <KeyboardAvoidingView style={{marginTop : StatusBar.currentHeight}}>
                        <View>
                            {firebase.auth().currentUser.emailVerified ? <Text style={{
                                alignSelf : 'center',
                                alignContent : 'center',
                                justifyContent : 'center',
                                marginBottom : 20,
                                marginLeft : 5}}>Your account has been verified.</Text> : <Text style={{
                                alignSelf : 'center',
                                alignContent : 'center',
                                justifyContent : 'center',
                                marginBottom : 20,
                                marginLeft : 5}}>You are not verified. Please check your inbox and verify your email to access all features. If there are any issues, try and restart the app.
                                </Text>
                            }
                            <View style={{marginBottom : 20}}>
                                <View style={{alignSelf : 'center', flex : 1, flexDirection : 'row', marginBottom : 50}}>
                                    <TextInput
                                        style = {{
                                            width : Dimensions.get('window').width*0.55,
                                            height : 30,
                                            borderWidth : 2,
                                            borderColor : '#000000',
                                            margin : 10,
                                            padding : 2
                                        }}
                                        onChangeText={
                                            name => {
                                                this.setState({ displayName : name });
                                            }
                                        }
                                        blurOnSubmit={false}
                                        value={this.state.displayName}
                                        placeholder = {
                                            "Display name"
                                        }
                                    />
                                    <TouchableOpacity
                                        style = {{
                                            width : Dimensions.get('window').width*0.35,
                                            height : 30,
                                            alignContent : 'center',
                                            justifyContent : 'center',
                                            backgroundColor : '#a8b61e',
                                            margin : 10,
                                            padding : 2
                                        }}
                                        onPress={()=>{this.changeName(this.state.displayName)}}
                                    >
                                        <Text style={{alignSelf : 'center'}}>Change name</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style = {{
                                alignSelf : 'center',
                                width : Dimensions.get('window').width*0.8,
                                marginTop : 10,
                                height : 30,
                                alignContent : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#a8b61e',
                                padding : 2
                            }}
                            onPress={()=>{this.updateNameOnAllStories()}}
                        >
                            <Text style={{alignSelf : 'center'}}>Update name on all stories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {{
                                alignSelf : 'center',
                                width : Dimensions.get('window').width*0.8,
                                marginTop : 10,
                                height : 30,
                                alignContent : 'center',
                                justifyContent : 'center',
                                backgroundColor : '#a8b61e',
                                padding : 2
                            }}
                            onPress={()=>{this.signout()}}
                        >
                            <Text style={{alignSelf : 'center'}}>Sign out</Text>
                        </TouchableOpacity>
                        <Text>Thanks to freepik for providing the application icon. Application built by Pruthvi Shrikaanth.</Text>
                    </KeyboardAvoidingView>
            )
        } else {
            return (
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <KeyboardAvoidingView style={{marginTop : StatusBar.currentHeight}}>
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
                                    this.setState({ email : email.trim() });
                                }
                            }
                            returnKeyType={'next'}
                            onSubmitEditing={()=>{ this.Password.focus(); }}
                            blurOnSubmit={false}
                            value={this.state.email}
                            placeholder = {
                                "Email"
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
                            ref={(input)=>{{ this.Password = input; }}}
                            value={this.state.password}
                            placeholder = {
                                "Password"
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
                            onPress={()=>{this.signin(this.state.email,this.state.password,this.state.displayName)}}
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
                            onPress={()=>{this.resetPassword(this.state.email)}}
                        >
                            <Text style={{alignSelf : 'center'}}>Forgot password</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            )
        }
    }
}