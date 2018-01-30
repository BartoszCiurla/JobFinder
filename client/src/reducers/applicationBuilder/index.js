import initialState from './initialState';
import _ from 'lodash';
import {
  SET_APPLICATION_CATEGORY,
  SET_APPLICATION_PROFESSION,
  SET_APPLICATION_SKILL,
  REMOVE_APPLICATION_SKILL
} from '../../constants/applicationBuilder';

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
  [SET_APPLICATION_SKILL]: (state, action) => {
    const data = {
      ...state,
      skills: [...state.skills, action.payload]
    };

    return { ...data };
  },
  [REMOVE_APPLICATION_SKILL]: (state, { payload: { description, level } }) => {
    const data = {
      ...state,
      skills: _.reject(state.skills, s => s.description === description && s.level === level)
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
