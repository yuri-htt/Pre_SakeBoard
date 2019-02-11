import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

import CategoryIcon from './categoryIcon';

const { width, height } = Dimensions.get('window');

class ListModal extends Component {
  render() {
    const {
      results,
      searching,
      matchLists,
    } = this.props;

    return (
      <Modal
        animationType="slide"
        onRequestClose={() => this.setState({ showModal: false })}
        transparent
        visible
      >
        <View style={styles.modalContainer}>

          <TextInput
            style={[styles.textInput, { width: width - 64 }]}
            value={results[0]}
            editable={false}
          />

          <View style={[styles.modal, { width, height: height - 230 }]}>

            {/* 検索中 */}
            {searching
                && (
                  <View style={[styles.modal, { width, height: height - 190 }, styles.center]}>
                    <ActivityIndicator size="large" color="#FF9800" />
                  </View>
                )
                }

            {/* 検索結果をリスト表示 */}
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {!searching && matchLists.length > 0 && matchLists.map((result, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <View key={`partial-result-${index}-View`}>
                  {this.renderCandidateListCard(result, index)}
                </View>
              ))}
            </ScrollView>

            {/* 検索結果が0件 */}
            {!searching && matchLists.length === 0
                && (
                  <View style={{ flex: 1 }}>
                    <Text>該当0件</Text>
                  </View>
                )
                }

          </View>

          <TouchableOpacity style={[styles.dismiss]} onPress={() => this.setState({ showModal: false, searching: false })}>
            <Ionicon name="ios-close-circle-outline" size={50} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  renderCandidateListCard(item, index) {
    if (item === undefined) return;
    // eslint-disable-next-line consistent-return
    return (
      <TouchableOpacity onPress={() => this.onPressCard(item)} key={`match-list-${index}-View`}>
        <View style={[Platform.OS === 'ios' ? styles.candidateCardforiOS : styles.candidateCardforAndroid, { width: width - 64 }]}>

          <CategoryIcon categoryName={item.categoryName} style={{ marginRight: 16 }} />

          <View style={styles.flex}>
            <Text style={styles.categoryCardTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <View style={styles.detail}>
              {!!item.areaName && !item.companyName
                && <Text style={styles.detailTxt} numberOfLines={1}>{item.areaName}</Text>
              }
              {!!item.companyName && !item.areaName
                && <Text style={styles.detailTxt} numberOfLines={1}>{item.companyName}</Text>
              }
              {!!item.areaName && !!item.companyName
                && <Text style={styles.detailTxt} numberOfLines={1}>{`${item.areaName}  ${item.companyName}`}</Text>
              }
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 32,
    paddingBottom: 32,
  },
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 16,
  },
  textInput: {
    height: 60,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginTop: 32,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismiss: {
    padding: 16,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateCardforAndroid: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
  },
  candidateCardforiOS: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  detail: {
    flexDirection: 'row',
  },
  detailTxt: {
    color: '#A2A2A2',
  },
});

const mapStatetoProps = (state) => {
  const { records } = state;
  return { records };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    // setModal,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(ListModal);
