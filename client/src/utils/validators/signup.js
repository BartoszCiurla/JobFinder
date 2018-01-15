import _ from 'lodash';
import { validEmail, validPassword } from '../validations';

const isValid = (value) => _.isEmpty(_.trim(value));

export const validate = ({ surname, name, email, userType, password, passwordConfirmation }) => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m })
  };

  isValid(surname) &&
    result.update('surname', 'please provide a surname');

  isValid(name) &&
    result.update('name', 'please provide a name');

  !validEmail(email) &&
    result.update('email', 'please provide a valid email address');

  isValid(userType) &&
    result.update('userType', 'please provide a user type');

  isValid(password) &&
    result.update('password', 'please provide a password');

  !validPassword(password)
    && result.update('password', 'password must be at least 8 characters');

  _.trim(password) !== _.trim(passwordConfirmation)
    && result.update('passwordConfirmation', 'password confirmation must match password');

  return result;
};


