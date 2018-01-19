import Api from '../utils/api';
import * as types from '../constants/common';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getSkillLevels = () => dispatch => (
  Api.get('api/SkillLevel/GetSkillLevels')
    .then(data => dispatch(setSkillLevels(data.skillLevels)))
    .catch(defaultErrorMessage)
);

export const setSkillLevels = skillLevels => (
  { type: types.SET_SKILL_LEVELS, payload: skillLevels }
);
