import { resultFactory, isValid } from './common';
import Resources from './resource';

export const validate = (skill) => {
  const result = resultFactory();

  !isValid(skill.description) &&
    result.update('skillDescription', Resources.skillDescription);

  skill.level === 0 &&
    result.update('skillLevel', Resources.skillLevel);

  return result;
};
