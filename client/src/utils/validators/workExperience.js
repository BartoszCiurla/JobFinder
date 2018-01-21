import { resultFactory, isValid } from './common';
import moment from 'moment';
import Resources from './resource';

const createDate = (date) => new Date(date.year, date.month);

export const validate = ({ company, role, startDate, finishDate, description}) => {
  const result = resultFactory();
  const start = createDate(startDate);
  const finish = createDate(finishDate);

  !isValid(company) &&
    result.update('company', Resources.company);

  !isValid(role) &&
    result.update('role', Resources.role);

  !isValid(description) &&
    result.update('description', Resources.description);

  const startDateIsValid = moment(start).isValid();
  const finishDateIsValid = moment(finish).isValid();

  !startDateIsValid && result.update('startDate', Resources.startDate);

  !finishDateIsValid && result.update('finishDate', Resources.finishDate);

  if(startDateIsValid && finishDateIsValid && moment(start).isAfter(finish)){
    result.update('startDate', Resources.wrongDate);
  }

  return result;
};
