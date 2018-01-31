import _ from 'lodash';

export const formatProfession = (category, profession, getState) => {
  const categories = getState().professions.categories;

  const selectedCategory = categories.find(x => _.trim(x.name) === _.trim(category));

  if (!selectedCategory) {
    return {
      category: { name: category, id: '' },
      profession: { name: profession, id: '' }
    };
  }

  const formatedProfession = selectedCategory.professionNames.find(x => _.trim(x.name) === profession);
  const formatedCategory = {
    id: selectedCategory.id,
    name: selectedCategory.name
  };

  if (!formatedProfession) {
    return {
      category: formatedCategory,
      profession: { name: profession, id: '' }
    };
  }

  return {
    category: formatedCategory,
    profession: formatedProfession
  };
};

