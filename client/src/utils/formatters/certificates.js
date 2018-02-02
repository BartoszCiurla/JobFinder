import _ from 'lodash';

export const formatCertificates = (certificates, category, getState) => {
  const emptyId = '00000000-0000-0000-0000-000000000000';
  if (category.id === emptyId) {
    return _.map(certificates, c => ({ id: emptyId, categoryId: emptyId, title: c.title }));
  }

  const { proposedCertificates } = getState().certificates;

  return _.map(certificates, c => {
    const proposedCertificate = _.find(proposedCertificates, pc => _.trim(pc.title) === _.trim(c.title));

    if (proposedCertificate) {
      return proposedCertificate;
    }

    return {
      id: emptyId,
      professionCategoryId: emptyId,
      title: c.title,
    };
  });
};

