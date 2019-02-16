import firebase from 'react-native-firebase';
import { getPosts } from './posts';

const initialState = {
  creating: false,
  created: false,
  categoryId: 0,
  categoryName: '',
  sakeName: '',
  areaName: '',
  companyName: '',
  starCount: 0,
  text: '',
};

export default function reducers(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT':
      return {
        categoryId: payload.categoryId,
        categoryName: payload.categoryName,
        sakeName: payload.sakeName,
        areaName: payload.areaName,
        companyName: payload.companyName,
        starCount: payload.starCount,
        text: payload.text,
        timestamp: payload.timestamp,
        key: payload.key,
      };
    case 'CLEAR': {
      return {
        initialState,
      };
    }
    case 'CREATE': {
      return {
        ...state,
        creating: true,
        created: false,
      };
    }
    case 'CREATE_SUCCESS': {
      return {
        ...state,
        creating: false,
        created: true,
      };
    }
    case 'CREATE_FAIL': {
      return {
        ...state,
        creating: false,
        created: true,
        error: payload,
      };
    }
    case 'UPDATE': {
      return {
        ...state,
        updating: true,
        updated: false,
      };
    }
    case 'UPDATE_SUCCESS': {
      return {
        ...state,
        updating: false,
        updated: true,
        categoryId: payload.categoryId,
        categoryName: payload.categoryName,
        sakeName: payload.sakeName,
        areaName: payload.areaName,
        companyName: payload.companyName,
        starCount: payload.starCount,
        text: payload.text,
        timestamp: payload.timestamp,
        key: payload.key,
      };
    }
    case 'UPDATE_FAIL': {
      return {
        ...state,
        updating: false,
        updated: true,
        error: payload,
      };
    }
    default:
      return state;
  }
}

export function selectSake(sake) {
  return {
    type: 'SELECT',
    payload: sake,
  };
}

function create() {
  return {
    type: 'CREATE',
  };
}

function createSuccess() {
  return {
    type: 'CREATE_SUCCESS',
  };
}

function createFail(err) {
  return {
    type: 'CREATE_FAIL',
    payload: err,
  };
}

function update() {
  return {
    type: 'UPDATE',
  };
}

function updateSuccess(data) {
  return {
    type: 'UPDATE_SUCCESS',
    payload: data,
  };
}

function updateFail(err) {
  return {
    type: 'UPDATE_FAIL',
    payload: err,
  };
}

export const createSakeRecord = item => (dispatch, getState) => {
  dispatch(create());

  const { user, post } = getState();
  const userCollection = firebase.firestore().collection('user');
  const postCollection = firebase.firestore().collection('post');

  const data = {
    categoryId: post.categoryId,
    categoryName: post.categoryName,
    sakeName: post.sakeName,
    areaName: post.areaName,
    companyName: post.companyName,
    starCount: item.starCount,
    text: item.text,
    timestamp: Date.now(),
    user: userCollection.doc(user.uid),
  };

  postCollection.add(data)
    .then(() => {
      dispatch(createSuccess());
    })
    .catch(e => createFail(e));
};

export const editSakeRecord = item => (dispatch, getState) => {
  dispatch(update());

  const { user, post } = getState();
  const userCollection = firebase.firestore().collection('user');
  const postCollection = firebase.firestore().collection('post');

  const data = {
    categoryId: post.categoryId,
    categoryName: post.categoryName,
    sakeName: post.sakeName,
    areaName: post.areaName,
    companyName: post.companyName,
    starCount: item.starCount,
    text: item.text,
    timestamp: Date.now(),
    user: userCollection.doc(user.uid),
  };

  postCollection.doc(`${post.key}`).update(data)
    .then(() => {
      dispatch(updateSuccess(data));
      dispatch(getPosts());
    })
    .catch(e => updateFail(e));
};
