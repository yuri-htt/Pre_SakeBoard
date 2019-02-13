import firebase from 'react-native-firebase';

const initialState = {
  launching: false,
  launched: false,
  isFirstTime: false,
  data: [],
};

export default function reducers(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return {
        ...state,
      };
    case 'LOAD_SUCCESS': {
      const data = payload.map(post => ({
        key: post.key,
        ...post.post,
      }));
      return {
        ...state,
        data,
      };
    }
    case 'LOAD_FAIL':
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const getPosts = () => (dispatch, getState) => {
  dispatch(requestPosts());

  const { user } = getState();
  firebase.firestore().settings({ timestampsInSnapshots: true });
  const userCollection = firebase.firestore().collection('user');
  const postCollection = firebase.firestore().collection('post');

  postCollection
    .where('user', '==', userCollection.doc(user.uid))
    .limit(100)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          data.push({
            key: doc.id,
            post: doc.data(),
          });
        }
      });
      dispatch(receivePosts(data));
    })
    .catch(err => dispatch(receivePostsFail(err)));
};

function requestPosts() {
  return {
    type: 'LOAD',
  };
}

function receivePosts(data) {
  return {
    type: 'LOAD_SUCCESS',
    payload: data,
  };
}

function receivePostsFail(err) {
  return {
    type: 'LOAD_FAIL',
    payload: err,
  };
}
