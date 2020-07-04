import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer, NavigationContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import readScreen from './screens/readScreen';
import writeScreen from './screens/writeScreen';
import loginScreen from './screens/loginScreen';
import readIcon from './assets/IconRead64px.png';
import writeIcon from './assets/IconWrite64px.png';
import tabNavigation from './tabNavigation';

const stack = createStackNavigator({ // order of list of components affects what content appears, you still have to research all the properties of createStackNavigator() in react-navigation 4.x
    homeScreen : {
        screen : tabNavigation
    },
    loginScreen : {
      screen : loginScreen
    }
});

const StackNavigation = createAppContainer(stack);

export default StackNavigation;