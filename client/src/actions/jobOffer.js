import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const createJobOffer = (jobOffer) => (dispatch, getState) => {
  const body = {...jobOffer, userId : getState().account.activeUser.id};

  return Api.post('api/JobOffer/CreateJobOffer',body)
    .then(data => console.log(data))
    .catch(defaultErrorMessage);
};
