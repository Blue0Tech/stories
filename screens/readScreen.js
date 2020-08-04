import React from 'react';
import { KeyboardAvoidingView, Platform, Text, Dimensions, View, FlatList, StyleSheet, StatusBar, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class readScreen extends React.Component {
    componentDidMount() {
        this.updateSearch();
    }
    constructor() {
        super();
        this.state = {
            searchText : "",
            data : {},
            results : [],
            isRefreshing : false,
            modalVisible : false,
            item : []
        }
    }
    updateSearch=async()=>{
        await db.ref('stories/all').orderByKey().on('value', (all) => {
            this.setState({
                data: all.val()
            });
        });
        var results = [];
        for(var x in this.state.data) {
            for(var y in this.state.data[x]) {
                delete this.state.data[x].timestamp; // to exclude timestamp numbers from search results
                if(JSON.stringify(this.state.data[x][y]).toLowerCase().search(this.state.searchText.toLowerCase())!=-1) {
                    results.push(this.state.data[x][y]);
                }
            }
        }
        this.setState({
            results : results,
            isRefreshing : false
        });
    }
    render() {
        const behavior = Platform.OS === "ios" ? "position" : "";
        const ViewStyle = {
            width : Dimensions.get('window').width,
            alignContent : 'center',
            alignItems : 'center',
            backgroundColor : '#00ffff',
            borderColor : '#000000',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderTopWidth : 1,
            margin : 10
        };
        return (
            <KeyboardAvoidingView style={{flex : 1, alignContent : 'center', marginTop : StatusBar.currentHeight}} behavior={behavior} enabled>
                <Modal visible={this.state.modalVisible}>
                    <ScrollView>
                        <Text style={{alignSelf : 'center', fontSize : 17, marginBottom : 20}}>{this.state.item.name}</Text>
                        <Text>{this.state.item.contents}</Text>
                        <TouchableOpacity
                        style={{
                            alignSelf : 'center',
                            alignItems : 'center',
                            width : Dimensions.get('window').width*0.4,
							height : 20,
                            justifyContent : 'center',
                            backgroundColor : '#a8b61e',
                            marginTop : 20
                        }} 
                        onPress={()=>{
                            this.setState({modalVisible : false})
                        }}><Text>Close</Text></TouchableOpacity>
                    </ScrollView>
                </Modal>
                <SearchBar
                    style = {{
                        placeholder : 'Search',
                    }}
                    onChangeText = {
                        searchText => {
                            this.setState({
                                searchText : searchText
                            });
                            this.updateSearch()
                        }
                    }
                    value = {
                        this.state.searchText
                    }
                    lightTheme = {
                        true
                    }
                />
                <FlatList
                    data={this.state.results}
                    initialNumToRender={6}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => 
                    <View key={index} style={ViewStyle}>
                        <TouchableOpacity
                        onPress={()=>{
                            this.setState({item : item, modalVisible : true});
                            console.log(item);
                        }}>
                            <Text style={{fontSize : 17, fontWeight : 'bold'}}>Author: {item.author}</Text>
                            <Text style={{fontSize : 14, fontWeight : 'normal'}}><Text style={{fontWeight : "bold"}}>Title: </Text>{item.name}</Text>
                            <Text style={{fontSize : 11, fontWeight : 'normal'}}><Text style={{fontWeight : "bold"}}>Preview: </Text>{item.contents.replace("\n"," ").substring(0,Dimensions.get('window').width*0.3)} ...</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    onRefresh={() => {
                        this.setState({
                            isRefreshing : true
                        });
                        this.updateSearch()
                    }}
                    refreshing={
                        this.state.isRefreshing
                    }
                />
            </KeyboardAvoidingView>
        )
    }
}
