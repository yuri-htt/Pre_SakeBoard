import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryIcon from '../components/categoryIcon';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 0,
      text: '',
    };
  }

  render() {
    const {
      starCount,
      text,
    } = this.state;

    const {
      sake,
    } = this.props;
    console.log(sake);
    return (

      <View style={styles.container}>
        <View style={[styles.contents]}>
          <View style={styles.sake}>

            <CategoryIcon categoryName={sake.categoryName} size={50} style={{ marginRight: 16 }} />

            <View style={styles.flex}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{sake.sakeName}</Text>
              <View style={styles.detail}>
                {!!sake.areaName && !sake.companyName
                  && <Text style={styles.detailTxt} numberOfLines={1}>{sake.areaName}</Text>
                }
                {!!sake.companyName && !sake.areaName
                  && <Text style={styles.detailTxt} numberOfLines={1}>{sake.companyName}</Text>
                }
                {!!sake.areaName && !!sake.companyName
                  && <Text style={styles.detailTxt} numberOfLines={1}>{`${sake.areaName}  ${sake.companyName}`}</Text>
                }
              </View>
            </View>
          </View>

          <View style={[styles.row, styles.starContainer]}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => this.onPressStarRating(rating)}
              starSize={28}
              buttonStyle={{ marginHorizontal: 8 }}
              fullStarColor="orange"
              emptyStarColor="orange"
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              multiline
              style={[styles.textInput]}
              underlineColorAndroid="transparent"
              placeholder="お酒の感想を記載しましょう"
              textAlignVertical="top"
              value={text}
              onChangeText={this.onChangeText}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => this.onPressSave()} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnTxt}>保存する</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressCancel()} style={styles.seondaryBtn}>
              <Text style={styles.secondaryBtnTxt}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  onPressStarRating(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  onPressSave = async () => {
    const {
      categoryId,
      categoryName,
      sakeName,
      areaName,
      companyName,
      starCount,
      text,
    } = this.state;
    const {
      user,
      navigation,
    } = this.props;

    Keyboard.dismiss();

    const result = await firebase.createPost(categoryId, categoryName, sakeName, areaName, companyName, starCount, text);

    if (result.error) {
      console.log(result.error);
    } else {
      // navigation.dispatch({ type: 'ADD_POST', payload: result });
      navigation.navigate('HomeTab');

      const response = await firebase.getPosts(user.uid);
      if (!response.error) {
        navigation.dispatch({ type: 'SET_POSTS', payload: response.data });
      } else {
        console.log(response.error);
      }
    }
  }

  onPressCancel() {
    const { navigation } = this.props;
    navigation.pop();
  }
}

const mapStatetoProps = (state) => {
  const { sake } = state;
  return { sake };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(Add);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  contents: {
    flex: 1,
  },
  sake: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  name: {
    fontSize: 20,
  },
  detail: {
    flexDirection: 'row',
  },
  detailTxt: {
    color: '#A2A2A2',
  },
  row: {
    flexDirection: 'row',
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    height: 50,
  },
  textInputContainer: {
    height: 180,
    marginBottom: 32,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    marginVertical: 8,
    width: 280,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seondaryBtn: {
    marginVertical: 8,
    width: 280,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  seondaryBtnTxt: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
