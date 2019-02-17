import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import store from './src/redux/store';
import AppBottomNav from './src/components/appBottomNav';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.flex}>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
