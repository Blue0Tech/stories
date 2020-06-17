import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import readScreen from './screens/readScreen';
import writeScreen from './screens/writeScreen';
import readIcon from './assets/IconRead64px.png';
import writeIcon from './assets/IconWrite64px.png';

export default function App() {
  return (
    <AppContainer/>
  );
}

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

const AppContainer = createAppContainer(tabNavigator);