import initialState from './initialState';
import { SET_OFFER_CATEGORY, SET_OFFER_PROFESSION } from '../../constants/offer';

const actions = {
  [SET_OFFER_CATEGORY]: (state, action) => {
    const data = {
      ...state,
      category: action.payload,
      profession: ''
    };
    return { ...data };
  },
  [SET_OFFER_PROFESSION]: (state, action) => {
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
