import { resultFactory } from './common';
import { trim, isEmpty, find, toUpper } from 'lodash';
import Resources from './resource';

export const validate = (certificateTitle, addedCertificates) => {
  const result = resultFactory();
  const tCertificateTitle = trim(certificateTitle);

  isEmpty(tCertificateTitle) &&
    result.update('certificateTitle', Resources.certificateTitle);

  const uTCertificateTitle = toUpper(tCertificateTitle);

  find(addedCertificates, ac => toUpper(trim(ac.title)) === uTCertificateTitle) &&
    result.update('certificateTitle', Resources.repeatedCertificate);

  return result;
};
