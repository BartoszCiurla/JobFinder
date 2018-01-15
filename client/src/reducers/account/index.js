import initialState from './initialState';
import { SET_USER_TYPES, SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../constants/account';

const actions = {
  [SET_USER_TYPES]: (state, action) => {
    const data = {
      ...state,
      userTypes: action.payload
    };
    return { ...data };
  },
  [SET_ACTIVE_USER]: (state, action) => {
    const data = {
      ...state,
      activeUser: {...action.payload}
    };
    return { ...data };
  },
  [REMOVE_ACTIVE_USER]: (state) => {
    const data = {
      ...state,
      activeUser: null
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
