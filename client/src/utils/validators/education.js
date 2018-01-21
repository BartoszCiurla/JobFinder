import { resultFactory, isValid } from './common';
import moment from 'moment';
import Resources from './resource';

const createDate = (date) => {
  if(date.year === '' || date.month === ''){
    return false;
  }
  return new Date(date.year, date.month);
};

export const validate = ({ schoolName, startDate, finishDate }) => {
  const result = resultFactory();
  const start = createDate(startDate);
  const finish = createDate(finishDate);

  !isValid(schoolName) &&
    result.update('schoolName', Resources.schoolName);

  if(!start){
    result.update('startDate', Resources.startDate);

    return result;
  }

  if(!finishDate){
    result.update('finishDate', Resources.finishDate);

    return result;
  }

  const startDateIsValid = moment(start).isValid();
  const finishDateIsValid = moment(finish).isValid();

  !startDateIsValid && result.update('startDate', Resources.startDate);

  !finishDateIsValid && result.update('finishDate', Resources.finishDate);

  if(startDateIsValid && finishDateIsValid && moment(start).isAfter(finish)){
    result.update('startDate', Resources.wrongDate);
  }

  return result;
};
