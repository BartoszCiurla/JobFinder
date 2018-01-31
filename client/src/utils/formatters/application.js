import { formatProfession } from './profession';
import { formatSkills } from './skills';

export const format = (getState) => {
  const { category, profession, skills } = getState().applicationBuilder;

  const formatedProfession = formatProfession(category, profession, getState);

  const formatedSkills = formatSkills(skills, formatedProfession.profession, getState);

  return {
    ...formatedProfession,
    skills: formatedSkills
  };
};
