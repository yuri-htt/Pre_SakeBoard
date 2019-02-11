import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUser } from '../redux/modules/user';

class HomeScreen extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.getUser();
  }

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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default HomeScreen

const mapStatetoProps = (state) => {
  const { records } = state;
  return { records };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUser,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
