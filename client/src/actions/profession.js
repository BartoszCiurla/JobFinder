import * as types from '../constants/profession';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setProfessions = (professions) => (
  { type: types.SET_PROFESSIONS, payload: professions }
);

export const setLoadingProfessions = () => (
  { type: types.SET_LOADING_PROFESSIONS }
);

export const getProfessions = () => dispatch => {
  dispatch(setLoadingProfessions());
  Api.get('api/Profession/GetProfessions')
    .then(data => dispatch(setProfessions(data.professionCategories)))
    .catch(defaultErrorMessage);
};
