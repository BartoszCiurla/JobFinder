import { formatProfession } from './profession';

export const format = (getState) => {
  const { category, profession } = getState().applicationBuilder;

  return {
    ...formatProfession(category, profession, getState)
  };
};
