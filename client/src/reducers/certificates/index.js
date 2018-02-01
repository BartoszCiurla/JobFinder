import initialState from './initialState';
import { SET_LOADING_CERTIFICATES, SET_CERTIFICATES} from '../../constants/certificates';

const actions = {
  [SET_LOADING_CERTIFICATES]: (state) => {
    const data = {
      ...state,
      isLoadingCertificates: true
    };
    return { ...data };
  },
  [SET_CERTIFICATES]: (state, action) => {
    const data = {
      ...state,
      isLoadingCertificates: false,
      proposedCertificates: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
