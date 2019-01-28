import React, {Component} from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import AppBottomNav from './src/components/appBottomNav'

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor="#083A3E"
          barStyle="light-content"
        />
        <AppStackNav/>
      </View>
    );
  }
}

const AppStackNav = createStackNavigator({
  AppBottomNav: {
    screen: AppBottomNav,
    navigationOptions: {
      headerTintColor: '#97c8eb',
      header: null
    }
  },
})