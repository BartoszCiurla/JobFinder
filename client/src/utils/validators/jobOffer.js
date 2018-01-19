import { resultFactory, isValid} from './common';
import Resources from './resource';

export const validate = ({ title }) => {
  const result = resultFactory();

  isValid(title) &&
    result.update('title', Resources.titleError);

  return result;
};


