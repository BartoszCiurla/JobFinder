import _ from 'lodash';
import toPascalCase from './toPascalCase';

export const formatLanguages = (languages, getState) => {
  const proposedLanguages = getState().languages.proposedLanguages;
  const emptyId = '00000000-0000-0000-0000-000000000000';

  return _.map(languages, l => {
    const proposedLanguage = _.find(proposedLanguages, pl => _.trim(pl.name) === _.trim(l.name));

    if (proposedLanguage) {
      return {
        ...proposedLanguage,
        level: l.level
      };
    }

    return {
      id: emptyId,
      name: toPascalCase(l.name),
      level: l.level
    };
  });
};

