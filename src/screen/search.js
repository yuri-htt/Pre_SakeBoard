import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Voice from 'react-native-voice';

import ListModal from '../components/listModal';
import images from '../components/images';
import CONFIG from '../config';
import Utils from '../lib/utils';

import { setModal } from '../redux/modules/search';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;

    this.state = {
      recognized: false,
      error: '',
      end: false,
      started: false,
      results: [],
      partialResults: [],
      convertedResults: [],
      showModal: false,
      searching: false,
      matchLists: [],
    };
  }

  componentDidMount() {
    this._startRecognizing();
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = () => {
    this.setState({
      started: '認識しています',
    });
  };

  onSpeechRecognized = () => {
    this.setState({
      recognized: true,
    });
  };

  onSpeechEnd = () => {
    this.setState({
      end: true,
    });
  };

  onSpeechError = (e) => {
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    this.setState({
      partialResults: e.value,
    });
  };

  _startRecognizing = () => {
    this.setState({
      error: '',
      started: '開始',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });

    Voice.start('ja-JP');
  };

  async startSerching() {
    this.props.setModal(true);
    this.setState({
      searching: true,
    });

    await Voice.stop();
    await this.waitForPartialResults();
    await this.convertAllTexts();

    console.log(this.state.convertedResults);
    const utils = new Utils();
    const response = await utils.getIndex(this.state.convertedResults);

    console.log(response);
    if (!response.error) {
      this.setState({
        searching: false,
        matchLists: response,
      });
    }
    if (response.error) {
      this.setState({
        searching: false,
      });
      console.log('通信状況が良い環境で再トライ！');
    }
  }

  waitForPartialResults() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  }

  convertAllTexts() {
    const {
      results,
      convertedResults,
      partialResults,
    } = this.state;

    return new Promise((resolve) => {
      const allCandidates = results.concat(partialResults);
      const uniqueAllCandidates = allCandidates.filter((x, i, self) => self.indexOf(x) === i);
      if (uniqueAllCandidates.length > 0) {
        uniqueAllCandidates.map((result, index) => {
          this.getConvertedText(result)
            .then((data) => {
              this.setState({
                convertedResults: convertedResults.concat(data.converted),
              });
            })
            .then(() => {
              if (partialResults.length === index + 1) {
                return resolve();
              }
            })
            .catch(error => console.log(error));
        });
      } else {
        this.setState({ searching: false });
      }
    });
  }

  getConvertedText = text => fetch('https://labs.goo.ne.jp/api/hiragana', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: CONFIG.GOO_API_KEY,
      sentence: text,
      output_type: 'katakana',
    }),
  })
    .then(response => response.json())

  onPressClear() {
    Voice.destroy();
    this.setState({
      // end: false,
      error: '',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });
    Voice.start('ja-JP');
  }

  async _destroyRecognizer() {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      // end: false,
      error: '',
      results: [],
      partialResults: [],
      convertedResults: [],
      matchLists: [],
    });

    Voice.start('ja-JP');
  }

  render() {
    const { search } = this.props;
    const NoSpeetchInputError = (this.state.error !== '') && (this.state.error === '{"message":"6/No speech input"}');
    const NoMatchError = (this.state.error !== '') && (this.state.error === '{"message":"7/No match"}');

    if (search && search.showModal) {
      return (
        <ListModal
          results={this.state.results}
          searching={this.state.searching}
          matchLists={this.state.matchLists}
          {...this.props}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.guideTxt}>お酒の名前を教えてください。</Text>
        <Text>{this.state.started}</Text>
        <View style={styles.voiceContainer}>
          <ImageBackground style={styles.voice} source={images.voiceShape}>
            <Text style={styles.stat}>
              {this.state.results[0]}
            </Text>
          </ImageBackground>
        </View>

        <View style={{ marginBottom: 64 }}>
          <View style={styles.mikeContainer}>

            <TouchableOpacity onPress={this._startRecognizing}>
              <Image style={styles.button} source={images.mike} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 104, justifyContent: 'center', alignItems: 'center' }}>

          {NoSpeetchInputError
          && (
          <TouchableOpacity onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
            <Text style={styles.secondaryBtnTxt}>再トライ</Text>
          </TouchableOpacity>
          )
          }

          {NoMatchError
          && (
          <TouchableOpacity onPress={this._destroyRecognizer} style={styles.seondaryBtn}>
            <Text style={styles.secondaryBtnTxt}>再トライ</Text>
          </TouchableOpacity>
          )
          }

          {!NoSpeetchInputError && !NoMatchError && this.state.results.length > 0
          && (
          <View>
            <View style={{ width: 280, height: 52 }}>
              {this.state.results.length > 0
              && (
              <TouchableOpacity onPress={() => this.startSerching()} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnTxt}>検索する</Text>
              </TouchableOpacity>
              )
              }
            </View>

            <View style={{ width: 280, height: 52 }}>
              <TouchableOpacity onPress={() => this.onPressClear()} style={styles.seondaryBtn}>
                <Text style={styles.secondaryBtnTxt}>クリア</Text>
              </TouchableOpacity>
            </View>
          </View>
          )
          }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  guideTxt: {
    fontSize: 16,
  },
  voiceContainer: {
    marginTop: 32,
  },
  voice: {
    width: 300 * 0.6,
    height: 180 * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animateContainer: {
    width: 110,
    height: 110,
    position: 'absolute',
  },
  mikeContainer: {
    marginTop: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
  },
  circle: {
    position: 'absolute',
    width: 110,
    height: 110,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
  stat: {
    textAlign: 'center',
    color: '#212121',
    marginBottom: 16,
  },
});

const mapStatetoProps = (state) => {
  const { search } = state;
  return { search };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setModal,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(SearchScreen);
