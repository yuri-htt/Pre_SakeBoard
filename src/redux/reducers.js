import { combineReducers } from 'redux';

import app from './modules/app';
import user from './modules/user';
import search from './modules/search';
import post from './modules/post';

export default combineReducers({
  app,
  user,
  search,
  post,
});
