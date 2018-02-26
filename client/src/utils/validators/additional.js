import { resultFactory } from './common';
import { isEmpty } from 'lodash';
import Resources from './resource';

export const validate = (companyName) => {
  const result = resultFactory();

  isEmpty(companyName) &&
    result.update('companyName', Resources.company);

  return result;
};
