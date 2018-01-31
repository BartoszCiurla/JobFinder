import _ from 'lodash';

export const formatProfession = (category, profession, getState) => {
  const categories = getState().professions.categories;
  const emptyId = '00000000-0000-0000-0000-000000000000';

  const selectedCategory = categories.find(x => _.trim(x.name) === _.trim(category));

  if (!selectedCategory) {
    return {
      category: { name: category, id: emptyId },
      profession: { name: profession, id: emptyId }
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
      profession: { name: profession, id: emptyId }
    };
  }

  return {
    category: formatedCategory,
    profession: formatedProfession
  };
};

