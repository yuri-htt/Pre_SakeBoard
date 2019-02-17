import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListCard from '../components/listCard';
import styleConstants from '../styleConstants';
import { createPost } from '../redux/modules/post';

class ListScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const categoryName = navigation.getParam('categoryName');

    this.state = {
      categoryName,
    };
  }

  render() {
    const { posts } = this.props;
    const { categoryName } = this.state;
    const listByCategory = posts.data.filter(data => data.categoryName === categoryName);

    return (
      <View style={styles.container}>
        <Text style={styles.headLine}>{categoryName}</Text>
        {listByCategory.length === 0
          && (
          <View style={styles.empty}>
            <Text style={styles.emptyTxt}>まだ飲んだお酒はありません</Text>
            <Text style={styles.emptyTxt}>さっそく今晩飲みに行きませんか？</Text>
          </View>
          )
        }
        {listByCategory.length > 0
        && (
        <View style={styles.timeLineCards}>
          <FlatList
            data={listByCategory}
            keyExtractor={item => item.key}
            renderItem={item => <ListCard item={item} {...this.props} />}
          />
        </View>
        )
        }
      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  const { posts } = state;
  return { posts };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    createPost,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(ListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  headLine: {
    fontSize: 30,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
  },
  timeLineCards: {
    marginTop: 16,
    marginBottom: 32,
  },
  empty: {
    height: 200,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTxt: {
    fontSize: 16,
    height: 16 * 1.3,
  },
});
