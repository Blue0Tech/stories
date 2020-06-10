import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import readScreen from './screens/readScreen';
import writeScreen from './screens/writeScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}

const tabNavigator = createBottomTabNavigator({
  Read : {screen : readScreen},
  Write : {screen : writeScreen}
});

const AppContainer = createAppContainer(tabNavigator);