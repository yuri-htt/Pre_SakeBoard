import React from 'react';
import {
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screen/home';
import SearchScreen from '../screen/search';
import AddScreen from '../screen/add';
import ListScreen from '../screen/list';
import DetailScreen from '../screen/detail';
import EditScreen from '../screen/edit';

export default function AppBottomNav() {
  return (
    <View style={{ flex: 1 }}>
      <BottomNav />
    </View>
  );
}

const HomeStack = createStackNavigator({
  Home: {
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
  Edit: {
    screen: EditScreen,
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


const BottomNav = createBottomTabNavigator({
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
