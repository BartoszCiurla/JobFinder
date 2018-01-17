import _ from 'lodash';
import Resources from './resource';

const isValid = (value) => _.isEmpty(_.trim(value));

export const validate = ({ title }) => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m })
  };

  isValid(title) &&
    result.update('title', Resources.titleError);

  return result;
};


