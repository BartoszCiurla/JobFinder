import _ from 'lodash';
import { validEmail, validPassword } from '../validations';
import Resources from './resource';

const isValid = (value) => _.isEmpty(_.trim(value));

export const validate = ({ surname, name, email, userType, password, passwordConfirmation }) => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m })
  };

  isValid(surname) &&
    result.update('surname', Resources.surname);

  isValid(name) &&
    result.update('name', Resources.name);

  !validEmail(email) &&
    result.update('email', Resources.email);

  isValid(userType) &&
    result.update('userType', Resources.userType);

  isValid(password) &&
    result.update('password', Resources.password);

  !validPassword(password)
    && result.update('password', Resources.passwordLength);

  _.trim(password) !== _.trim(passwordConfirmation)
    && result.update('passwordConfirmation', Resources.passwordConfirmation);

  return result;
};


