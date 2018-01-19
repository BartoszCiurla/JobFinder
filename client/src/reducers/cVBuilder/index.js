import _ from 'lodash';
import initialState from './initialState';
import { SET_REGULAR_FIELD_CVB, ADD_SKILL, REMOVE_SKILL, EDIT_SKILL } from '../../constants/cVBuilder';

const actions = {
  [SET_REGULAR_FIELD_CVB]: (state, action) => {
    const data = {
      ...state,
      [action.payload.name]: action.payload.value
    };
    return { ...data };
  },
  [ADD_SKILL]: (state, action) => {
    const data = {
      ...state,
      skills: [...state.skills, action.payload]
    };
    return { ...data };
  },
  [REMOVE_SKILL]: (state, action) => {
    const data = {
      ...state,
      skills: _.reject(state.skills, s => s.skill === action.payload)
    };
    return { ...data };
  },
  [EDIT_SKILL]: (state, action) => {
    const { key , name, value } = action.payload;
    const data = {
      ...state,
      skills: _.map(state.skills, s => s.skill === key? {...s, [name]:value} : s)
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
