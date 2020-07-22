import React from 'react';
import { KeyboardAvoidingView, Platform, Text, Dimensions, View, FlatList } from 'react-native';
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
            isRefreshing : false
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
            <KeyboardAvoidingView style={{flex : 1, alignContent : 'center'}} behavior={behavior} enabled>
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
                ></SearchBar>
                <FlatList
                    data={this.state.results}
                    renderItem={({ item, index }) => 
                    <View key={index} style={ViewStyle}>
                        <Text style={{fontSize : '1.25em', fontWeight : 'bold'}}>Author: {item.author}</Text>
                        <Text style={{fontSize : '1em', fontWeight : 'normal'}}><Text style={{fontWeight : "bold"}}>Title: </Text>{item.name}</Text>
                        <Text style={{fontSize : '0.85em', fontWeight : 'normal'}}><Text style={{fontWeight : "bold"}}>Preview: </Text>{item.contents.replace("\n"," ").substring(0,Dimensions.get('window').width*0.3)} ...</Text>
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
