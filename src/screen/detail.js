import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryIcon from '../components/categoryIcon';
import { createPost } from '../redux/modules/post';

class DetailScreen extends Component {
  render() {
    const { post } = this.props;
    const postedDate = moment(post.timestamp).format('MM月DD日');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CategoryIcon categoryName={post.categoryName} size={60} style={styles.icon} />
          <View style={styles.flex}>
            <Text style={styles.name} numberOfLines={2}>{post.name}</Text>
            <View style={styles.detail}>
              {!!post.areaName && !post.companyName
                && <Text style={styles.detailTxt} numberOfLines={1}>{post.areaName}</Text>
              }
              {!!post.companyName && !post.areaName
                && <Text style={styles.detailTxt} numberOfLines={1}>{post.companyName}</Text>
              }
              {!!post.areaName && !!post.companyName
                && <Text style={styles.detailTxt} numberOfLines={1}>{`${post.areaName}  ${post.companyName}`}</Text>
              }
            </View>
          </View>
        </View>
        <View style={styles.stars}>
          <StarRating
            disabled
            maxStars={5}
            rating={post.starCount}
            starSize={16}
            starStyle={{ marginRight: 4 }}
            containerStyle={{ justifyContent: 'flex-start' }}
            fullStarColor="orange"
            emptyStarColor="orange"
          />
        </View>
        <Text style={styles.contentTxt}>{post.text}</Text>
        <Text style={styles.dateTxt}>{postedDate}</Text>

        <ActionButton
          buttonColor="#212121"
          renderIcon={() => <Icon name="edit" size={24} color="rgba(255,255,255,1)" />}
          onPress={() => this.onPressEdit()}
        />

      </View>
    );
  }

  onPressEdit() {
    const { navigation } = this.props;
    navigation.push('Edit');
  }
}

const mapStatetoProps = (state) => {
  const { post } = state;
  return { post };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    createPost,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(DetailScreen);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
  },
  header: {
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  detail: {
    flexDirection: 'row',
  },
  detailTxt: {
    color: '#A2A2A2',
  },
  name: {
    fontSize: 16,
  },
  contentTxt: {
    marginTop: 16,
    color: '#212121',
  },
  dateTxt: {
    marginTop: 16,
    color: '#757575',
  },
});
