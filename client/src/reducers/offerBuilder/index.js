import initialState from './initialState';
import _ from 'lodash';
import {
  SET_OFFER_CATEGORY,
  SET_OFFER_PROFESSION,
  SET_OFFER_REQUIRED_SKILL,
  REMOVE_OFFER_REQUIRED_SKILL,
  SET_OFFER_WELCOME_SKILL,
  REMOVE_OFFER_WELCOME_SKILL,
  SET_OFFER_LANGUAGE,
  SET_OFFER_REGULAR_FIELD,
  REMOVE_OFFER_LANGUAGE
} from '../../constants/offerBuilder';

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
  [SET_OFFER_REQUIRED_SKILL]: (state, action) => {
    const data = {
      ...state,
      requiredSkills: [...state.requiredSkills, action.payload]
    };

    return { ...data };
  },
  [REMOVE_OFFER_REQUIRED_SKILL]: (state, { payload: { description, level } }) => {
    const data = {
      ...state,
      requiredSkills: _.reject(state.requiredSkills, s => s.description === description && s.level === level)
    };
    return { ...data };
  },
  [SET_OFFER_WELCOME_SKILL]: (state, action) => {
    const data = {
      ...state,
      welcomeSkills: [...state.welcomeSkills, action.payload]
    };

    return { ...data };
  },
  [REMOVE_OFFER_WELCOME_SKILL]: (state, { payload: { description, level } }) => {
    const data = {
      ...state,
      welcomeSkills: _.reject(state.welcomeSkills, s => s.description === description && s.level === level)
    };
    return { ...data };
  },
  [SET_OFFER_LANGUAGE]: (state, action) => {
    const data = {
      ...state,
      languages: [...state.languages, action.payload]
    };

    return { ...data };
  },
  [REMOVE_OFFER_LANGUAGE]: (state, { payload: { name, level } }) => {
    const data = {
      ...state,
      languages: _.reject(state.languages, s => s.name === name && s.level === level)
    };
    return { ...data };
  },
  [SET_OFFER_REGULAR_FIELD]: (state, { payload: { name, value } }) => {
    const data = {
      ...state,
      [name]: value
    };

    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
