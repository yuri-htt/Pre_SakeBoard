import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class PostScreen extends Component {
    render() {
        return (
            <View style={styles.center}>
               <Text>POST</Text>
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

export default PostScreen