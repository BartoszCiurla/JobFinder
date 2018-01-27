import { formatProfession } from './profession';

export const format = (getState) => {
  const { category, profession } = getState().offerBuilder;

  return {
    ...formatProfession(category, profession, getState)
  };
};
