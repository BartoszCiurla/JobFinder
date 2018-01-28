import initialState from './initialState';
import { SET_APPLICATION_CATEGORY, SET_APPLICATION_PROFESSION } from '../../constants/applicationBuilder';

const actions = {
  [SET_APPLICATION_CATEGORY]: (state, action) => {
    const data = {
      ...state,
      category: action.payload,
      profession: ''
    };
    return { ...data };
  },
  [SET_APPLICATION_PROFESSION]: (state, action) => {
    const data = {
      ...state,
      profession: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
