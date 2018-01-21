import { resultFactory, isValid } from './common';

import Resources from './resource';
import { validEmail } from '../validations';

// const createDate = (date) => {
//   if(date.year === '' || date.month === ''){
//     return false;
//   }
//   return new Date(date.year, date.month);
// };

export const validate = ({
  name,
  roleTitle,
  aboutYou,
  email,
  // phoneNumber,
  // educations,
  // workExperience,
  // skills,
  // certifications
}) => {
  const result = resultFactory();


  !isValid(name) &&
    result.update('name', Resources.name);

  !isValid(roleTitle) &&
    result.update('roleTitle', Resources.role);

  !isValid(aboutYou) &&
    result.update('aboutYou', Resources.aboutYou);

  !validEmail(email) &&
    result.update('email', Resources.email);

  //todo other validations but this is not important now

  return result;
};
