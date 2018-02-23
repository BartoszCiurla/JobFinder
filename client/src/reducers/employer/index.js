import initialState from './initialState';
import _ from 'lodash';
import { SET_LOADING_OFFERS, SET_OFFERS, SET_OFFER, REMOVE_OFFER } from '../../constants/employer';

const actions = {
  [SET_LOADING_OFFERS]: (state) => {
    const data = {
      ...state,
      isLoadingOffers: true
    };
    return { ...data };
  },
  [SET_OFFER]: (state, action) => {
    const data = {
      ...state,
      selectedOffer: action.payload
    };
    return { ...data };
  },
  [SET_OFFERS]: (state, action) => {
    const data = {
      ...state,
      isLoadingOffers: false,
      offers: action.payload
    };
    return { ...data };
  },
  [REMOVE_OFFER]: (state, action) => {
    const data = {
      ...state,
      offers: _.reject(state.offers, ja => ja.id === action.payload)
    };
    return { ...data };
  }
};

export default (state = initialState, action) => {
  if (actions[action.type]) return actions[action.type](state, action);
  return state;
};
