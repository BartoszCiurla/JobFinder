import * as types from '../constants/languages';
import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setLanguages = (languages) => (
  { type: types.SET_LANGUAGES, payload: languages }
);

export const setLoadingLanguages = () => (
  { type: types.SET_LOADING_LANGUAGES }
);

export const getLanguages = () => dispatch => {
  dispatch(setLoadingLanguages());

  Api.get('api/Language/GetLanguages')
    .then(data => dispatch(setLanguages(data.languages)))
    .catch(defaultErrorMessage);
};
