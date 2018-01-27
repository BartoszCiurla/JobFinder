import * as types from '../constants/employer';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getOffers = (credentials) => dispatch => {
  dispatch(setLoadingOffers());

  return Api.post('api/Offer/GetEmployerOffersList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setOffers(data.offers)))
    .catch(defaultErrorMessage);
};

export const setLoadingOffers = () => (
  { type: types.SET_LOADING_OFFERS }
);

export const setOffers = (offers) => (
  { type: types.SET_OFFERS, payload: offers }
);
