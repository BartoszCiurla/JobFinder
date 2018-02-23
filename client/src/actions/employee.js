import * as types from '../constants/employee';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getJobApplications = (credentials) => dispatch => {
  dispatch(setLoadingJobApplications());

  return Api.get('api/JobApplication/GetEmployeeJobApplicationList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setJobApplications(data.applications)))
    .catch(defaultErrorMessage);
};

export const setLoadingJobApplications= () => (
  { type: types.SET_LOADING_JOB_APPLICATIONS }
);

export const setJobApplications = (applications) => (
  { type: types.SET_JOB_APPLICATIONS, payload: applications }
);

export const setJobApplication = (id) => (
  { type: types.SET_JOB_APPLICATION, payload: id }
);
