import _ from 'lodash';
import initialState from './initialState';
import {
  SET_REGULAR_FIELD_CVB,
  ADD_SKILL,
  REMOVE_SKILL,
  ADD_EXPERIENCE,
  REMOVE_EXPERIENCE
} from '../../constants/cVBuilder';

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
  [ADD_EXPERIENCE]: (state, action) => {
    const data = {
      ...state,
      workExperience: [...state.workExperience, action.payload]
    };
    return { ...data };
  },
  [REMOVE_EXPERIENCE]: (state, action) => {
    const { company, role } = action.payload;
    const data = {
      ...state,
      workExperience: _.reject(state.workExperience,
        we => we.company === company && we.role === role)
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
