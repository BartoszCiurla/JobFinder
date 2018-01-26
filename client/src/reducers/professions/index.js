import initialState from './initialState';
import { SET_PROFESSIONS, SET_LOADING_PROFESSIONS } from '../../constants/profession';

const actions = {
  [SET_LOADING_PROFESSIONS]: (state) => {
    const data = {
      ...state,
      isLoadingProfessions: true
    };
    return { ...data };
  },
  [SET_PROFESSIONS]: (state, action) => {
    const data = {
      ...state,
      isLoadingProfessions: false,
      categories: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
