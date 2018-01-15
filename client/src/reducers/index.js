
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import account from './account';

const rootReducer = combineReducers({
  account,
  routing: routerReducer
});

export default rootReducer;
