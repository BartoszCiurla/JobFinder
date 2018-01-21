import { resultFactory, isValid } from './common';
import moment from 'moment';
import _ from 'lodash';
import Resources from './resource';

const createDate = (date) => {
  if(date.year === '' || date.month === ''){
    return false;
  }
  return new Date(date.year, date.month);
};

export const validate = ({ certification, certifications }) => {
  const result = resultFactory();
  const { certificateName, finishDate } = certification;
  const finish = createDate(finishDate);

  !isValid(certificateName) &&
    result.update('certificateName', Resources.certificateName);

  if(!finish){
    result.update('finishDate', Resources.finishDate);
    return result;
  }

  !moment(finish).isValid() &&
    result.update('finishDate', Resources.finishDate);

  if(moment(finishDate).isAfter(moment(new Date()).add(1, 'M'))){
    result.update('finishDate', Resources.wrongCertificationDate);
  }

  _.find(certifications, c => c.certificateName === certificateName
    && c.finishDate.month === finishDate.month
    && c.finishDate.year === finishDate.year) &&
    result.update('certificateName', Resources.repeatedCertification);

  return result;
};
