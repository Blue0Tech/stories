import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import readScreen from './screens/readScreen';
import writeScreen from './screens/writeScreen';
import profileScreen from './screens/profileScreen';
import readIcon from './assets/IconRead64px.png';
import writeIcon from './assets/IconWrite64px.png';
import profileIcon from './assets/IconProfile64px.png';

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
    }},
    Profile : {screen : profileScreen, navigationOptions : {
      title : 'My profile',
      tabBarLabel : 'My profile',
      tabBarIcon : () => (
        <Image source={profileIcon} style={{ width : 20, height : 20}}/>
      )
    }}
});

const TabNavigation = createAppContainer(tabNavigator);

export default TabNavigation;