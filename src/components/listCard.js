import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import CategoryIcon from './categoryIcon';

export default class CategoryCard extends Component {
  render() {
    const {
      item,
    } = this.props;

    const post = {
      ...item.item,
      key: item.item.key,
    };

    const postedDate = moment(item.timestamp).format('MM月DD日');
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.onPressCard(post)}>
        <View style={styles.container} onLayout={this.onLayout}>

          <View style={styles.leftColumn}>
            <CategoryIcon categoryName={post.categoryName} style={{ marginRight: 16 }} />
          </View>

          <View style={styles.rightColumn}>
            {post.sakeName != '' && (
              <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{post.sakeName}</Text>
            )}
            <Text style={styles.text}>{postedDate}</Text>
            <View style={styles.stars}>
              <StarRating
                disabled
                maxStars={5}
                rating={post.starCount}
                starSize={12}
                starStyle={{ marginRight: 2 }}
                containerStyle={{ justifyContent: 'flex-start' }}
                fullStarColor="orange"
                emptyStarColor="orange"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onPressCard(post) {
    const { navigation } = this.props;
    navigation.dispatch({ type: 'SET_POST', payload: post });
    navigation.push('Detail', { post });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: '#BDBDBD',
    shadowRadius: 2,
    padding: 16,
    flexDirection: 'row',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  leftColumn: {
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
  },
  titleText: {
    color: '#212121',
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
  text: {
    color: '#757575',
    fontSize: 12,
  },
  time: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
    color: '#999',
  },
  stars: {
    marginTop: 8,
  },
});
