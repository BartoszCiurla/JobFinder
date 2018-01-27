
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import cVBuilder from './cVBuilder';
import common from './common';
import professions from './professions';
import offerBuilder from './offerBuilder';
import employer from './employer';

const rootReducer = combineReducers({
  account,
  cVBuilder,
  common,
  professions,
  offerBuilder,
  employer,
  routing: routerReducer
});

export default rootReducer;
