import _ from 'lodash';

export const formatSkills = (skills, profession, getState) => {
  const emptyId = '00000000-0000-0000-0000-000000000000';
  if (profession.id === emptyId) {
    return _.map(skills, s => ({ id: emptyId, professionId: emptyId, description: s.description, level: s.level }));
  }

  const { proposedSkills } = getState().skills;

  return _.map(skills, s => {
    const proposedSkill = _.find(proposedSkills, ps => _.trim(ps.description) === _.trim(s.description));

    if (proposedSkill) {
      return {
        ...proposedSkill,
        level: s.level
      };
    }

    return {
      id: emptyId,
      professionId: emptyId,
      description: s.description,
      level: s.level
    };
  });
};

