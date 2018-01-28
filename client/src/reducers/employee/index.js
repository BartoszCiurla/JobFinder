import initialState from './initialState';
import { SET_JOB_APPLICATION, SET_JOB_APPLICATIONS,SET_LOADING_JOB_APPLICATIONS } from '../../constants/employee';

const actions = {
  [SET_LOADING_JOB_APPLICATIONS]: (state) => {
    const data = {
      ...state,
      isLoadingJobApplications: true
    };
    return { ...data };
  },
  [SET_JOB_APPLICATION]: (state, action) => {
    const data = {
      ...state,
      selectedJobApplication: action.payload
    };
    return { ...data };
  },
  [SET_JOB_APPLICATIONS]: (state, action) => {
    const data = {
      ...state,
      isLoadingJobApplications: false,
      jobApplications: action.payload
    };
    return { ...data };
  },
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
