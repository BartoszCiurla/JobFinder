import { resultFactory,isValid } from './common';
import { validEmail, validPassword } from '../validations';
import Resources from './resource';

export const validate = ({ email, password}) => {
  const result = resultFactory();

  !validEmail(email) &&
    result.update('email', Resources.email);

  !isValid(password) &&
    result.update('password', Resources.password);

  !validPassword(password)
    && result.update('password', Resources.passwordLength);

  return result;
};


