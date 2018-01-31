import initialState from './initialState';
import { SET_LANGUAGES, SET_LOADING_LANGUAGES} from '../../constants/languages';

const actions = {
  [SET_LOADING_LANGUAGES]: (state) => {
    const data = {
      ...state,
      isLoadingLanguages: true
    };
    return { ...data };
  },
  [SET_LANGUAGES]: (state, action) => {
    const data = {
      ...state,
      isLoadingLanguages: false,
      proposedLanguages: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
