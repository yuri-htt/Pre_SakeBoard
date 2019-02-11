import firebase from 'react-native-firebase';


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

// export const getUser = () => ({
//   type: 'TEST',
// })

// export const setUser = () => ({
//     type: 'TEST',
// })

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

export const getUser = () => {
  let action;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      action = setUser(user.uid);
    } else {
      firebase.auth().signInAnonymously()
        .then(() => {
          action = setUser(firebase.auth().currentUser.uid);
        })
        .catch((error) => {
          action = setUserFail(error);
        });
    }
  });

  return action;
};
