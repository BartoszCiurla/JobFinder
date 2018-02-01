import initialState from './initialState';
import _ from 'lodash';
import {
  SET_APPLICATION_CATEGORY,
  SET_APPLICATION_PROFESSION,
  SET_APPLICATION_SKILL,
  REMOVE_APPLICATION_SKILL,
  SET_APPLICATION_LANGUAGE,
  REMOVE_APPLICATION_LANGUAGE,
  SET_APPLICATION_CERTIFICATE,
  REMOVE_APPLICATION_CERTIFICATE,
  CLEAN_APPLICATION_SKILLS
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
  },
  [SET_APPLICATION_LANGUAGE]: (state, action) => {
    const data = {
      ...state,
      languages: [...state.languages, action.payload]
    };

    return { ...data };
  },
  [REMOVE_APPLICATION_LANGUAGE]: (state, { payload: { name, level } }) => {
    const data = {
      ...state,
      languages: _.reject(state.languages, s => s.name === name && s.level === level)
    };
    return { ...data };
  },
  [SET_APPLICATION_CERTIFICATE]: (state, action) => {
    const data = {
      ...state,
      certificates: [...state.certificates, { title: action.payload }]
    };

    return { ...data };
  },
  [REMOVE_APPLICATION_CERTIFICATE]: (state, { payload }) => {
    const data = {
      ...state,
      certificates: _.reject(state.certificates, s => s.title === payload)
    };
    return { ...data };
  },
  [CLEAN_APPLICATION_SKILLS]: (state) => {
    const data = {
      ...state,
      skills: []
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
