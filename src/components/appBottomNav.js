import React from 'react';
import {
  View,
} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';

export default function AppBottomNav() {
  return (
    <View style={{ flex: 1 }}>
      <BottomNav />
    </View>
  );
}

// TODO: Warningが出るのでReduxを見てreact-navigationのメソッドに直す
const BottomNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (<View style={{ width: 24, height: 24, backgroundColor: '#FFF' }} />),
    },
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => (<View style={{ width: 24, height: 24, backgroundColor: '#FFF' }} />),
    },
  },
}, {
  initialRouteName: 'Home',
  activeTintColor: '#FFF',
  shifting: true,
  barStyle: {
    backgroundColor: '#000',
  },
});
