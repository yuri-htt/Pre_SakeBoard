import React from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import store from './src/redux/store';
import AppBottomNav from './src/components/appBottomNav';
import AddScreen from './src/screen/add';
import ListScreen from './src/screen/list';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#083A3E"
          barStyle="light-content"
        />
        <AppStackNav />
      </View>
    </Provider>
  );
}

const AppStackNav = createStackNavigator({
  AppBottomNav: {
    screen: AppBottomNav,
    navigationOptions: {
      headerTintColor: '#97c8eb',
      header: null,
    },
  },
});
