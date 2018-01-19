import _ from 'lodash';

export const isValid = (value) => !_.isEmpty(_.trim(value));

export const resultFactory = () => {
  const result = {
    errors: [],
    isValid: () => _.isEmpty(result.errors),
    update: (a, m) => result.errors.push({ attribute: a, message: m }),
  };

  return result;
};
