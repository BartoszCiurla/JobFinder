
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';
import curriculumVitaeBuilder from './curriculumVitaeBuilder';

const rootReducer = combineReducers({
  account,
  curriculumVitaeBuilder,
  routing: routerReducer
});

export default rootReducer;
