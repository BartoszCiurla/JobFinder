import Api from '../utils/api';
import * as types from '../constants/offerBuilder';
import { format } from '../utils/formatters/offer';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createOffer = (credentials) => (dispatch, getState) => {
  const body = { ...format(getState), userId: credentials.userId };
  return new Promise((resolve, reject) => {
    Api.post('api/Offer/Create', body, credentials.token)
      .then(() => {
        dispatch(cleanOfferData());
        resolve();
      })
      .catch((e) => {
        defaultErrorMessage(e);
        reject();
      });
  });
};

export const setOfferCategory = (offerCategory) => (
  { type: types.SET_OFFER_CATEGORY, payload: offerCategory }
);

export const setOfferProfession = (profession) => (
  { type: types.SET_OFFER_PROFESSION, payload: profession }
);

export const setOfferRequiredSkill = (skill) => (
  { type: types.SET_OFFER_REQUIRED_SKILL, payload: skill }
);

export const removeOfferRequiredSkill = (skill) => (
  { type: types.REMOVE_OFFER_REQUIRED_SKILL, payload: skill }
);

export const setOfferWelcomeSkill = (skill) => (
  { type: types.SET_OFFER_WELCOME_SKILL, payload: skill }
);

export const removeOfferWelcomeSkill = (skill) => (
  { type: types.REMOVE_OFFER_WELCOME_SKILL, payload: skill }
);

export const setOfferLanguage = (language) => (
  { type: types.SET_OFFER_LANGUAGE, payload: language }
);

export const removeOfferLanguage = (language) => (
  { type: types.REMOVE_OFFER_LANGUAGE, payload: language }
);

export const setOfferRegularField = (fieldData) => (
  { type: types.SET_OFFER_REGULAR_FIELD, payload: fieldData }
);

export const cleanOfferData = () => (
  { type: types.CLEAN_OFFER_DATA }
);
