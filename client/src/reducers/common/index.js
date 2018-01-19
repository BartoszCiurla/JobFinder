import initialState from './initialState';
import { SET_SKILL_LEVELS } from '../../constants/common';

const actions = {
  [SET_SKILL_LEVELS]: (state, action) => {
    const data = {
      ...state,
      skillLevels: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
