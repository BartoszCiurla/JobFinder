import initialState from './initialState';
import _ from 'lodash';
import {
  SET_OFFER_REQUIRED_SKILL,
  REMOVE_OFFER_REQUIRED_SKILL,
  SET_OFFER_WELCOME_SKILL,
  REMOVE_OFFER_WELCOME_SKILL,
  SET_OFFER_LANGUAGE,
  SET_OFFER_REGULAR_FIELD,
  REMOVE_OFFER_LANGUAGE,
  CLEAN_OFFER_DATA
} from '../../constants/offerBuilder';

const actions = {
  [SET_OFFER_REGULAR_FIELD]: (state, { payload: { name, value } }) => {
    const data = {
      ...state,
      [name]: value
    };

    if(name === 'category'){
      data.profession = '';
    }

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
  [REMOVE_OFFER_LANGUAGE]: (state, { payload: { description, level } }) => {
    const data = {
      ...state,
      languages: _.reject(state.languages, s => s.description === description && s.level === level)
    };
    return { ...data };
  },
  [CLEAN_OFFER_DATA]: () => {
    return { ...initialState };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
