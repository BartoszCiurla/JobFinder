import * as types from '../constants/cVBuilder';
import Api from '../utils/api';
import {format} from '../utils/formatters/cv';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setRegularField = regularNameAndValue => (
  { type: types.SET_REGULAR_FIELD_CVB, payload: regularNameAndValue }
);

export const addSkill = skill => (
  { type: types.ADD_SKILL, payload: skill }
);

export const removeSkill = skill => (
  { type: types.REMOVE_SKILL, payload: skill }
);

export const addExperience = experience => (
  { type: types.ADD_EXPERIENCE, payload: experience }
);

export const removeExperience = experiece => (
  { type: types.REMOVE_EXPERIENCE, payload: experiece }
);

export const addCertification = certification => (
  { type: types.ADD_CERTIFICATION, payload: certification }
);

export const removeCertification = certification => (
  { type: types.REMOVE_CERTIFICATION, payload: certification }
);

export const addEducation = education => (
  { type: types.ADD_EDUCATION, payload: education }
);

export const removeEducation = education => (
  { type: types.REMOVE_EDUCATION, payload: education }
);

export const createCV = (props) => (dispatch, getState) => {
  const body = {...format(props), userId : getState().account.activeUser.id};

  Api.post('api/CV/Create', body)
  .then(true)
  .catch(defaultErrorMessage);
};
