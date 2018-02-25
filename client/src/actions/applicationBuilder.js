import Api from '../utils/api';
import * as types from '../constants/applicationBuilder';
import { format } from '../utils/formatters/application';
import { getJobApplications } from './employee';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createApplication = (credentials) => (dispatch, getState) => {
  const body = { ...format(getState), userId: credentials.userId };

  return Api.post('api/JobApplication/Create', body, credentials.token)
    .then(() => {
      dispatch(cleanApplicationData());
      dispatch(getJobApplications(credentials));
    })
    .catch((e) => {
      defaultErrorMessage(e);
    });
};

export const setApplicationRegularField = (value) => (
  { type: types.SET_APPLICATION_REGULAR_FIELD, payload: value }
);

export const setApplicationSkill = (skill) => (
  { type: types.SET_APPLICATION_SKILL, payload: skill }
);

export const removeApplicationSkill = (skill) => (
  { type: types.REMOVE_APPLICATION_SKILL, payload: skill }
);

export const cleanApplicationData = () => (
  { type: types.CLEAN_APPLICATION_DATA }
);

export const setApplicationLanguage = (language) => (
  { type: types.SET_APPLICATION_LANGUAGE, payload: language }
);

export const removeApplicationLanguage = (language) => (
  { type: types.REMOVE_APPLICATION_LANGUAGE, payload: language }
);

export const setApplicationCertificate = (certificate) => (
  { type: types.SET_APPLICATION_CERTIFICATE, payload: certificate }
);

export const removeApplicationCertificate = (certificate) => (
  { type: types.REMOVE_APPLICATION_CERTIFICATE, payload: certificate }
);

