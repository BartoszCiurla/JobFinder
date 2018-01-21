import _ from 'lodash';

const createStartAndFinishDate = (item) => ({
  ...item,
  startDate: new Date(item.startDate.year, item.startDate.month),
  finishDate: new Date(item.finishDate.year, item.finishDate.month)
});

const createFinishDate = (item) => ({
  ...item,
  finishDate: new Date(item.finishDate.year, item.finishDate.month)
});

export const format = ({
  name,
  roleTitle,
  aboutYou,
  email,
  phoneNumber,
  educations,
  workExperience,
  skills,
  certifications}) => ({
      name,
      roleTitle,
      aboutYou,
      email,
      phoneNumber,
      educations: _.map(educations, createStartAndFinishDate),
      workExperience: _.map(workExperience, createStartAndFinishDate),
      skills,
      certifications: _.map(certifications, createFinishDate)
});
