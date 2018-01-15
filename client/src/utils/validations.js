/*eslint-disable */
import _ from 'lodash';

export const validEmail = (email) => (
  /^[a-zA-Z0-9._&+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
);

export const validPhone = (phone) => (
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
);

export const validPassword = (password) => (
  _.trim(password).length >= 8
);
/*eslint-enable */

