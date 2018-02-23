import * as types from '../constants/certificates';
import Api from '../utils/api';
import { formatProfession } from '../utils/formatters/profession';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setCertificates = (professions) => (
  { type: types.SET_CERTIFICATES, payload: professions }
);

export const setLoadingCertificates = () => (
  { type: types.SET_LOADING_CERTIFICATES }
);

export const getCertificates = (category) => (dispatch, getState) => {
  dispatch(setLoadingCertificates());
  const formatedProfession = formatProfession(category, '', getState);
  Api.get('api/Profession/GetProposedCertificates', {
    professionCategoryId: formatedProfession.category.id,
  })
    .then(data => dispatch(setCertificates(data.proposedCertificates)))
    .catch(defaultErrorMessage);
};
