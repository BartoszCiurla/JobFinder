import * as types from '../constants/skills';
import Api from '../utils/api';
import { formatProfession } from '../utils/formatters/profession';


const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const setSkills = (professions) => (
  { type: types.SET_SKILLS, payload: professions }
);

export const setLoadingSkills = () => (
  { type: types.SET_LOADING_SKILLS }
);

export const getSkills = (category, profession) => (dispatch, getState) => {
  dispatch(setLoadingSkills());
  const formatedProfession = formatProfession(category, profession, getState);

  Api.get('api/Profession/GetProposedSkills', {
    professionCategoryId: formatedProfession.category.id,
    professionId: formatedProfession.profession.id
  })
    .then(data => dispatch(setSkills(data.proposedSkills)))
    .catch(defaultErrorMessage);
};
