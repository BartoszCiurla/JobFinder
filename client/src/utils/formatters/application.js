import { formatProfession } from './profession';
import { formatSkills } from './skills';
import { formatLanguages } from './languages';

export const format = (getState) => {
  const { category, profession, skills, languages } = getState().applicationBuilder;

  const formatedProfession = formatProfession(category, profession, getState);

  const formatedSkills = formatSkills(skills, formatedProfession.profession, getState);

  const formatedLanguages = formatLanguages(languages, getState);

  return {
    ...formatedProfession,
    skills: formatedSkills,
    languages: formatedLanguages
  };
};
