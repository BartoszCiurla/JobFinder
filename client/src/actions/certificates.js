import * as types from '../constants/certificates';
import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setCertificates = (professions) => (
  { type: types.SET_CERTIFICATES, payload: professions }
);

export const setLoadingCertificates = () => (
  { type: types.SET_LOADING_CERTIFICATES }
);

export const getCertificates = (category) => (dispatch, getState) => {
  dispatch(setLoadingCertificates());
  dispatch(setCertificates([]));
  // Api.post('api/Profession/GetProposedSkills', {
  //   professionCategoryId: formatedProfession.category.id,
  //   professionId: formatedProfession.profession.id
  // })
  //   .then(data => dispatch(setCertifications(data.proposedSkills)))
  //   .catch(defaultErrorMessage);
};
