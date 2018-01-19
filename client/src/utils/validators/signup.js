import _ from 'lodash';
import { validEmail, validPassword } from '../validations';
import Resources from './resource';

import { resultFactory, isValid } from './common';

export const validate = ({ surname, name, email, userType, password, passwordConfirmation }) => {
  const result = resultFactory();

  !isValid(surname) &&
    result.update('surname', Resources.surname);

  !isValid(name) &&
    result.update('name', Resources.name);

  !validEmail(email) &&
    result.update('email', Resources.email);

  !isValid(userType) &&
    result.update('userType', Resources.userType);

  !isValid(password) &&
    result.update('password', Resources.password);

  !validPassword(password)
    && result.update('password', Resources.passwordLength);

  _.trim(password) !== _.trim(passwordConfirmation)
    && result.update('passwordConfirmation', Resources.passwordConfirmation);

  return result;
};


