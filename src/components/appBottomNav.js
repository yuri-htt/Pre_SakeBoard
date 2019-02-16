import React from 'react';
import {
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';
import AddScreen from '../screen/add';
import ListScreen from '../screen/list';
import DetailScreen from '../screen/detail';

export default function AppBottomNav() {
  return (
    <View style={{ flex: 1 }}>
      <BottomNav />
    </View>
  );
}

const HomeStack = createStackNavigator({
  Search: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  List: {
    screen: ListScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
});


const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null,
    },
  },
  Add: {
    screen: AddScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
});


// TODO: Warningが出るのでReduxを見てreact-navigationのメソッドに直す
const BottomNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (<View style={{ width: 24, height: 24, backgroundColor: '#FFF' }} />),
    },
  },
  Search: {
    screen: SearchStack,
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
