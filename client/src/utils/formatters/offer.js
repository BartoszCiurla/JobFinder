import { formatProfession } from './profession';
import { formatSkills } from './skills';
import { formatLanguages } from './languages';

export const format = (getState) => {
  const { category, profession, companyName, requiredSkills, welcomeSkills, languages, certificatesWillBeAnAdvantage } = getState().offerBuilder;

  const formatedProfession = formatProfession(category, profession, getState);

  const formatedRequiredSkills = formatSkills(requiredSkills, formatedProfession.profession, getState);

  const formatedWelcomeSkills = formatSkills(welcomeSkills, formatedProfession.profession, getState);

  const formatedLanguages = formatLanguages(languages, getState);


  return {
    ...formatedProfession,
    companyName,
    requiredSkills: formatedRequiredSkills,
    welcomeSkills: formatedWelcomeSkills,
    languages: formatedLanguages,
    certificatesWillBeAnAdvantage
  };
};
