import React from 'react';
import { Text, View } from 'react-native';

export default class writeScreen extends React.Component {
    render() {
        return (
            <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
                <Text>Write your own stories here!</Text>
            </View>
        )
    }
}