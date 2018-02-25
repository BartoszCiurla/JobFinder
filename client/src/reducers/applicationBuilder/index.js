import initialState from './initialState';
import _ from 'lodash';
import {
  SET_APPLICATION_REGULAR_FIELD,
  SET_APPLICATION_SKILL,
  REMOVE_APPLICATION_SKILL,
  SET_APPLICATION_LANGUAGE,
  REMOVE_APPLICATION_LANGUAGE,
  SET_APPLICATION_CERTIFICATE,
  REMOVE_APPLICATION_CERTIFICATE,
  CLEAN_APPLICATION_DATA
} from '../../constants/applicationBuilder';

const actions = {
  [SET_APPLICATION_REGULAR_FIELD]: (state, { payload: { name, value } }) => {
    const data = {
      ...state,
      [name]: value,
    };

    if(name === 'category'){
      data.profession = '';
    }

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
  [CLEAN_APPLICATION_DATA]: () => {
    return { ...initialState };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
