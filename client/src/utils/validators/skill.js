import _ from 'lodash';
import { resultFactory, isValid } from './common';
import Resources from './resource';

export const validate = (skill, skillLevel, addedSkills) => {
  const result = resultFactory();

  !isValid(skill) &&
    result.update('skill', Resources.skill);

  !isValid(skillLevel) &&
    result.update('skillLevel', Resources.skillLevel);

  _.find(addedSkills, ak => ak.skill === skill) &&
    result.update('skill', Resources.repeatedSkill);

  return result;
};
