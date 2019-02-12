import firebase from 'react-native-firebase';

const initialState = {
  showModal: false,
};

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
    case 'SET_MODAL':
      return {
        showModal: payload,
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

export function setModal(visible) {
  return {
    type: 'SET_MODAL',
    payload: visible,
  };
}
