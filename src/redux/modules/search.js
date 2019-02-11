import firebase from 'react-native-firebase';

const initialState = null;

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SEARCH':
      return {
        start: true,
      };
    case 'SEARCH_SUCCESS':
      return {
        start: false,
      };
    default:
      return state;
  }
};


export const getIndex2 = () => (dispatch) => {
  dispatch(startSearching());
  dispatch(endSearching());
};

function startSearching() {
  return {
    type: 'SEARCH',
  };
}

function endSearching() {
  return {
    type: 'SEARCH_SUCCESS',
  };
}
