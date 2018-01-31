import initialState from './initialState';
import { SET_LOADING_SKILLS, SET_SKILLS} from '../../constants/skills';

const actions = {
  [SET_LOADING_SKILLS]: (state) => {
    const data = {
      ...state,
      isLoadingSkills: true
    };
    return { ...data };
  },
  [SET_SKILLS]: (state, action) => {
    const data = {
      ...state,
      isLoadingSkills: false,
      proposedSkills: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
