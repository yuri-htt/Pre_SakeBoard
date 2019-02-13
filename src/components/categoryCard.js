import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import images from './images';
import styleConstants from '../styleConstants';

export default class CategoryCard extends Component {
  getCategoryIcon = (categoryName) => {
    let icon;
    switch (categoryName) {
      case 'カクテル':
        icon = images.cooktail;
        break;
      case 'ワイン':
        icon = images.wine;
        break;
      case 'ビール':
        icon = images.beer;
        break;
      case '日本酒':
        icon = images.sake;
        break;
      case '焼酎':
        icon = images.syotyu;
        break;
      case 'ウイスキー':
        icon = images.whisky;
        break;
      default:
        icon = images.cooktail;
        break;
    }
    return icon;
  }

  render() {
    const {
      categoryName,
    } = this.props;

    return (
      <TouchableOpacity style={styles.categoryCard} onPress={() => this.onPressCard()}>
        <Image
          style={styles.icon}
          source={this.getCategoryIcon(categoryName)}
        />
        <Text style={styles.categoryCardTxt}>{categoryName}</Text>
      </TouchableOpacity>
    );
  }

  onPressCard() {
    const {
      navigation,
      categoryName,
    } = this.props;

    navigation.push('List', { categoryName });
  }
}

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 8,
    elevation: 3,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 16,
  },
  categoryCardTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: styleConstants.primaryTxt,
  },
});
