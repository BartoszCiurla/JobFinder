import * as types from '../constants/account';
import Config from '../settings/api';

const defaultErrorMessage = () => console.log("Occured some errors");

export const getUserTypes = () => dispatch => (
  fetch(`${Config.apiUrl}api/Account/GetUserTypes`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => dispatch(setUserTypes(data.userTypes)))
    .catch(() => {
      defaultErrorMessage();
    })
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
  fetch(`${Config.apiUrl}api/Account/RegisterUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(() => {
    return true;
  }).catch(() => {
    defaultErrorMessage();
    return false;
  })
);

export const login = (user) => dispatch => {
  let formData = new FormData();
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('rememberMe', user.rememberMe);
  return fetch(`${Config.apiUrl}auth`, {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json();
  })
    .then(data => {
      dispatch(setActiveUser(data));
      return data;
    })
    .catch(() => {
      defaultErrorMessage();
    });
};
