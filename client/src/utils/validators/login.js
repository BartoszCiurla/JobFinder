import _ from 'lodash';
import { validEmail, validPassword } from '../validations';

const isValid = (value) => _.isEmpty(_.trim(value));

export const validate = ({ email, password}) => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m })
  };

  !validEmail(email) &&
    result.update('email', 'please provide a valid email address');

  isValid(password) &&
    result.update('password', 'please provide a password');

  !validPassword(password)
    && result.update('password', 'password must be at least 8 characters');

  return result;
};


