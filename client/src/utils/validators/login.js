import _ from 'lodash';
import { validEmail, validPassword } from '../validations';
import Resources from './resource';

const isValid = (value) => _.isEmpty(_.trim(value));

export const validate = ({ email, password}) => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m })
  };

  !validEmail(email) &&
    result.update('email', Resources.email);

  isValid(password) &&
    result.update('password', Resources.password);

  !validPassword(password)
    && result.update('password', Resources.passwordLength);

  return result;
};


