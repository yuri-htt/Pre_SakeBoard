import { combineReducers } from 'redux';

import app from './modules/app';
import user from './modules/user';

export default combineReducers({
  app,
  user,
});