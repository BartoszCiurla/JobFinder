import initialState from './initialState';
import { SET_REGULAR_FIELD_CVB } from '../../constants/curriculumVitaeBuilder';

const actions = {
  [SET_REGULAR_FIELD_CVB]: (state, action) => {
    const data = {
      ...state,
      [action.payload.name]: action.payload.value
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
