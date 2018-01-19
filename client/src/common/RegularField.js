import React from 'react';
import PropTypes from 'prop-types';
import ValidatedInput from './ValidatedInput';

const RegularField = (props) => (
  <ValidatedInput errorMessage={props.errorMessage}>
    <input
      name={props.name}
      defaultValue={props.value}
      placeholder={props.placeholder}
      className={props.className}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress || null}
      type={props.type}
    />
  </ValidatedInput>
);

RegularField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string
};

export default RegularField;
