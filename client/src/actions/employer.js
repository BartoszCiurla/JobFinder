import * as types from '../constants/employer';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getOffers = (credentials) => dispatch => {
  dispatch(setLoadingOffers());

  return Api.get('api/Offer/GetEmployerOffersList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setOffers(data.offers)))
    .catch(defaultErrorMessage);
};

export const getRecommendedApplications = (offerId, credentials) => () => {
  return Api.get('api/Offer/GetRecommendedApplicationList', { offerId: offerId }, credentials.token);
};

export const setLoadingOffers = () => (
  { type: types.SET_LOADING_OFFERS }
);

export const setOffers = (offers) => (
  { type: types.SET_OFFERS, payload: offers }
);

export const setOffer = (id) => (
  { type: types.SET_OFFER, payload: id }
);

export const removeOffer = (credentials, id) => dispatch => {
  Api.delete('api/Offer/DeleteOffer', { offerId: id }, credentials.token)
    .then(() => dispatch(_removeOffer(id)))
    .catch(defaultErrorMessage);
};

const _removeOffer = (id) => (
  { type: types.REMOVE_OFFER, payload: id }
);

