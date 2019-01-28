import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.center}>
               <Text>HOME</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems:'center',
    justifyContent:"center"
  },
});

export default HomeScreen