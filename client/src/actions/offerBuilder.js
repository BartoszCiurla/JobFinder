import Api from '../utils/api';
import * as types from '../constants/offerBuilder';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createOffer = (credentials) => (dispatch, getState) => {
  const body = { ...getState().offer, userId: credentials.userId };

  return Api.post('api/Offer/Create', body, credentials.token)
    .then(data => console.log(data))
    .catch(defaultErrorMessage);
};

export const setOfferCategory = (offerCategory) => (
  { type: types.SET_OFFER_CATEGORY, payload: offerCategory }
);

export const setOfferProfession = (profession) => (
  { type: types.SET_OFFER_PROFESSION, payload: profession }
);
