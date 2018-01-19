
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import cVBuilder from './cVBuilder';
import common from './common';

const rootReducer = combineReducers({
  account,
  cVBuilder,
  common,
  routing: routerReducer
});

export default rootReducer;
