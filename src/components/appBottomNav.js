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

const BottomNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions: {
      tabBarLabel: 'Post',
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