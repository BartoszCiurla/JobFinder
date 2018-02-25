import { formatProfession } from './profession';
import { formatSkills } from './skills';
import { formatLanguages } from './languages';
import { formatCertificates } from './certificates';

export const format = (getState) => {
  const { category, salary, profession, skills, languages, certificates } = getState().applicationBuilder;

  const formatedProfession = formatProfession(category, profession, getState);

  const formatedSkills = formatSkills(skills, formatedProfession.profession, getState);

  const formatedLanguages = formatLanguages(languages, getState);

  const formatedCertificates = formatCertificates(certificates, formatedProfession.category, getState);

  return {
    ...formatedProfession,
    salary,
    skills: formatedSkills,
    languages: formatedLanguages,
    certificates: formatedCertificates
  };
};
