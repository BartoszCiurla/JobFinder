import * as types from '../constants/curriculumVitaeBuilder';

export const setRegularField = regularNameAndValue => (
  { type: types.SET_REGULAR_FIELD_CVB, payload: regularNameAndValue }
);
