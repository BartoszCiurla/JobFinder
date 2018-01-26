
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import cVBuilder from './cVBuilder';
import common from './common';
import professions from './professions';
import offer from './offer';

const rootReducer = combineReducers({
  account,
  cVBuilder,
  common,
  professions,
  offer,
  routing: routerReducer
});

export default rootReducer;
