
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import common from './common';
import professions from './professions';
import skills from './skills';
import offerBuilder from './offerBuilder';
import applicationBuilder from './applicationBuilder';
import employer from './employer';
import employee from './employee';

const rootReducer = combineReducers({
  account,
  common,
  professions,
  skills,
  offerBuilder,
  employer,
  employee,
  applicationBuilder,
  routing: routerReducer
});

export default rootReducer;
