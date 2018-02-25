import { resultFactory, isValid } from './common';
import Resources from './resource';

export const validate = (salary) => {
  const result = resultFactory();

  !isValid(salary) &&
    result.update('salary', Resources.salary);

  const pSalary = parseInt(salary);
  (!pSalary || pSalary === 0) &&
    result.update('salary', Resources.salary);

  return result;
};


