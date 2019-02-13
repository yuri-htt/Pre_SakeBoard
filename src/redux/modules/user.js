import firebase from 'react-native-firebase';

import { getPosts } from './posts';

const initialState = null;

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      return {
        uid: payload.uid,
      };
    case 'SET_USER_FAIL':
      return {
        error: payload.error,
      };
    default:
      return state;
  }
};

export const setUser = uid => ({
  type: 'SET_USER',
  payload: {
    uid,
  },
});

const setUserFail = error => ({
  type: 'SET_USER_FAIL',
  payload: {
    error,
  },
});

export const getUser = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user.uid));
      dispatch(getPosts());
    } else {
      firebase.auth().signInAnonymously()
        .then(() => {
          dispatch(setUser(firebase.auth().currentUser.uid));
        })
        .catch((error) => {
          dispatch(setUserFail(error));
        });
    }
  });
};
