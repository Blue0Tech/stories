import React from 'react';
import { Text, View } from 'react-native';

export default class readScreen extends React.Component {
    render() {
        return (
            <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
                <Text>Read stories here!</Text>
            </View>
        )
    }
}