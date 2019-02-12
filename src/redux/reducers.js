import { combineReducers } from 'redux';

import app from './modules/app';
import user from './modules/user';
import search from './modules/search';
import sake from './modules/sake';

export default combineReducers({
  app,
  user,
  search,
  sake,
});
