import { resultFactory, isValid } from './common';
import Resources from './resource';

export const validate = (language) => {
  const result = resultFactory();

  !isValid(language.name) &&
    result.update('languageName', Resources.languageName);

    language.level === 0 &&
    result.update('languageLevel', Resources.languageLevel);

  return result;
};
