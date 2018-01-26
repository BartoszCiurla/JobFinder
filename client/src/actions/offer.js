import Api from '../utils/api';
import * as types from '../constants/offer';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createJobOffer = (jobOffer) => (dispatch, getState) => {
  const body = { ...jobOffer, userId: getState().account.activeUser.id };

  return Api.post('api/JobOffer/CreateJobOffer', body)
    .then(data => console.log(data))
    .catch(defaultErrorMessage);
};

export const setOfferCategory = (offerCategory) => (
  { type: types.SET_OFFER_CATEGORY, payload: offerCategory }
);

export const setOfferProfession = (profession) => (
  { type: types.SET_OFFER_PROFESSION, payload: profession }
);
