import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import HomeScreen from '../screen/home'
import PostScreen from '../screen/post'

class AppBottomNav extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomNav />
      </View>
    )
  }
}

// TODO: Warningが出るのでReduxを見てreact-navigationのメソッドに直す
const BottomNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (<View style={{ width: 24, height: 24, backgroundColor: '#FFF'}} />) 
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions: {
      tabBarLabel: 'Post',
      tabBarIcon: () => (<View style={{ width: 24, height: 24, backgroundColor: '#FFF'}} />) 
    }
  },
}, {
    initialRouteName: 'Home',
    activeTintColor: '#FFF',
    shifting: true,
    barStyle: {
      backgroundColor: '#000'
    }
  }
)

export default AppBottomNav