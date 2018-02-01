import { resultFactory } from './common';
import Resources from './resource';
import _ from 'lodash';

export const validate = (language, addedLanguages) => {
  const result = resultFactory();
  const tLanguageName = _.trim(language.name);

  _.isEmpty(tLanguageName) &&
    result.update('languageName', Resources.languageName);

  language.level === 0 &&
    result.update('languageLevel', Resources.languageLevel);

  const uTLanguageName = _.toUpper(tLanguageName);

  _.find(addedLanguages, al => _.toUpper(_.trim(al.name)) === uTLanguageName) &&
    result.update('languageName', Resources.repeatedLanguage);

  return result;
};
