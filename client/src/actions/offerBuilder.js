import Api from '../utils/api';
import * as types from '../constants/offerBuilder';
import { format } from '../utils/formatters/offer';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createOffer = (credentials) => (dispatch, getState) => {
  const body = { ...format(getState), userId: credentials.userId };
  console.log(body);
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
