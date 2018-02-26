import * as types from '../constants/employer';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getOffers = (credentials) => dispatch => {
  dispatch(setLoadingOffers());

  return Api.get('api/Offer/GetEmployerOffersList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setOffers(data.offers)))
    .catch(defaultErrorMessage);
};

export const getRecommendedApplications = (offerId, credentials) => (dispatch) => {
  return Api.get('api/Offer/GetRecommendedApplicationList', { offerId: offerId }, credentials.token)
    .then(data => dispatch(setRecommendedJobApplications(data.recommendedJobApplications)))
    .catch(defaultErrorMessage);
};

export const getOfferDetails = (offerId, credentials) => (dispatch) => {
  return Api.get('api/Offer/GetEmployerOfferDetails', { offerId: offerId }, credentials.token)
    .then(data => dispatch(setOfferDetails(data)))
    .catch(defaultErrorMessage);
};

export const setOfferDetails = (offerDetails) => (
  { type: types.SET_OFFER_DETAILS, payload: offerDetails }
);

export const setRecommendedJobApplications = (jobApplications) => (
  { type: types.SET_RECOMMENDED_JOB_APPLICATIONS, payload: jobApplications }
);

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

