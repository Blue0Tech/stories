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
import stackNavigation from './stackNavigation';
import StackNavigation from './stackNavigation';

export default function App() {
  return (
    <StackNavigation/>
  );
}