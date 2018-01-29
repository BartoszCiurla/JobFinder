import { resultFactory, isValid } from './common';
import Resources from './resource';

export const validate = (category, profession) => {
  const result = resultFactory();

  !isValid(category) &&
    result.update('category', Resources.category);

  !isValid(profession) &&
    result.update('profession', Resources.profession);

  return result;
};


