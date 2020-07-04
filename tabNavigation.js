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

const tabNavigator = createBottomTabNavigator({
    Read : {screen : readScreen, navigationOptions : {
      title : 'Read stories',
      tabBarLabel : 'Read stories',
      tabBarIcon : () => (
        <Image source={readIcon} style={{ width : 20, height : 20 }}/>
      )
    }},
    Write : {screen : writeScreen, navigationOptions : {
      title : 'Write stories',
      tabBarLabel : 'Write stories',
      tabBarIcon : () => (
        <Image source={writeIcon} style={{ width : 20, height : 20 }}/>
      )
    }}
});

const TabNavigation = createAppContainer(tabNavigator);

export default TabNavigation;