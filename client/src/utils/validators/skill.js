import { resultFactory } from './common';
import _ from 'lodash';
import Resources from './resource';

export const validate = (skill, addedSkills) => {
  const result = resultFactory();
  const tDescription = _.trim(skill.description);

  _.isEmpty(tDescription) &&
    result.update('skillDescription', Resources.skillDescription);

  skill.level === 0 &&
    result.update('skillLevel', Resources.skillLevel);

  const uTDescription = _.toUpper(tDescription);

  _.find(addedSkills, as => _.toUpper(_.trim(as.description)) === uTDescription) &&
    result.update('skillDescription', Resources.repeatedSkill);

  return result;
};
