import * as types from '../constants/profession';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getProfessions = () => dispatch => (
  Api.get('api/Profession/GetProfessions')
    .then(data => console.log(data))
    .catch(defaultErrorMessage)
);
