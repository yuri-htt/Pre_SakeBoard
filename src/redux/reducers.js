import { combineReducers } from 'redux';

import app from './modules/app';
import user from './modules/user';
import search from './modules/search';

export default combineReducers({
  app,
  user,
  search,
});
