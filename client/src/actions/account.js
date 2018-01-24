import * as types from '../constants/account';

import Api, {getConfig} from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getUserTypes = () => dispatch => (
  Api.get('api/Account/GetUserTypes')
    .then(data => dispatch(setUserTypes(data.userTypes)))
    .catch(defaultErrorMessage)
);

export const setUserTypes = userTypes => (
  { type: types.SET_USER_TYPES, payload: userTypes }
);

export const setActiveUser = user => (
  { type: types.SET_ACTIVE_USER, payload: user }
);

export const removeActiveUser = () => (
  { type: types.REMOVE_ACTIVE_USER }
);

export const createAccount = (user) => () => (
  Api.post('api/Account/RegisterUser', user)
    .then(true)
    .catch(defaultErrorMessage)
);

export const login = (user) => () => {
  let formData = new FormData();
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('rememberMe', user.rememberMe);

  return fetch(`${getConfig().apiUrl}auth`, {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json();
  })
    .then(data => {
      return data;
    })
    .catch(() => {
      defaultErrorMessage();
    });
};
