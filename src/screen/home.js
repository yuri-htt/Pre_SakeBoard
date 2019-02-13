import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styleConstants from '../styleConstants';
import images from '../components/images';
import CategoryCard from '../components/categoryCard';

import { getUser } from '../redux/modules/user';
import { getPosts } from '../redux/modules/posts';

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const posts = {
      data: [],
    };

    return (
      <ScrollView style={styles.container}>
        <View testID="Home">

          <View style={styles.category}>
            <Text style={styles.headLine}>カテゴリ</Text>
            <View style={styles.categoryCards} />
            <View style={styles.row}>
              <CategoryCard categoryName="カクテル" {...this.props} />
              <CategoryCard categoryName="ワイン" {...this.props} />
              <CategoryCard categoryName="ビール" {...this.props} />
            </View>
            <View style={styles.row}>
              <CategoryCard categoryName="日本酒" {...this.props} />
              <CategoryCard categoryName="焼酎" {...this.props} />
              <CategoryCard categoryName="ウイスキー" {...this.props} />
            </View>

          </View>

          <View style={styles.timeLine}>
            <Text style={styles.headLine}>タイムライン</Text>

            {/* {posts.data.length === 0
              && (
              <View style={styles.empty}>
                <Text style={styles.emptyTxt}>まだ飲んだお酒はありません</Text>
                <Text style={styles.emptyTxt}>さっそく今晩飲みに行きませんか？</Text>
              </View>
              )
            }
            {posts.data.length > 0
              && (
              <View style={styles.timeLineCards}>
                <FlatList
                  data={posts.data}
                  keyExtractor={item => item.key}
                  renderItem={item => <ListCard item={item} {...this.props} />}
                />
              </View>
              )
            } */}

          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  // header
  header: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 32,
  },
  degree: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    marginTop: 32,
  },
  degreeIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'gray',
    marginBottom: 16,
  },
  degreeTxt: {
    color: styleConstants.secondaryTxt,
  },
  summary: {
    flexDirection: 'row',
    marginTop: 8,
  },
  total: {
    flex: 1,
    alignItems: 'center',
  },
  badges: {
    flex: 1,
    alignItems: 'center',
  },
  num: {
    fontSize: 50,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: styleConstants.hintTxt,
  },
  // category
  category: {
    marginTop: 32,
    marginBottom: 32,
  },
  headLine: {
    fontSize: 30,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
  },
  categoryCards: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
  // timeLine
  timeLine: {
    marginTop: 16,
  },
  timeLineCards: {
    marginTop: 16,
    marginBottom: 32,
  },
  // model
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 400,
  },
  primaryBtn: {
    marginVertical: 8,
    width: 300 - 64,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  modalImg: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  modalTitleTxt: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalContentTxt: {
    color: '#212121',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 12 * 1.5,
  },
  // empty
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

// export default HomeScreen

const mapStatetoProps = (state) => {
  const { records } = state;
  return { records };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUser,
    getPosts,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
