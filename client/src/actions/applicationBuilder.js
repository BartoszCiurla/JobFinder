import Api from '../utils/api';
import * as types from '../constants/applicationBuilder';
import { format } from '../utils/formatters/application';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createApplication = (credentials) => (dispatch, getState) => {
  const body = { ...format(getState), userId: credentials.userId };
  console.log(body);
  return Api.post('api/JobApplication/Create', body, credentials.token)
    .then(data => console.log(data))
    .catch(defaultErrorMessage);
};

export const setApplicationCategory = (offerCategory) => (
  { type: types.SET_APPLICATION_CATEGORY, payload: offerCategory }
);

export const setApplicationProfession = (profession) => (
  { type: types.SET_APPLICATION_PROFESSION, payload: profession }
);

export const setApplicationSkill = (skill) => (
  { type: types.SET_APPLICATION_SKILL, payload: skill }
);

export const removeApplicationSkill = (skill) => (
  { type: types.REMOVE_APPLICATION_SKILL, payload: skill }
);

export const cleanApplicationsSkills = () => (
  { type: types.CLEAN_APPLICATION_SKILLS }
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

