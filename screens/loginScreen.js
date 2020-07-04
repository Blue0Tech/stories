import React from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../config';

export default class loginScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Login screen</Text>
            </View>
        )
    }
}