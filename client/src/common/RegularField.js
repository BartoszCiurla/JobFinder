import React from 'react';
import PropTypes from 'prop-types';
import ValidatedInput from './ValidatedInput';

const RegularField = (props) => (
  <ValidatedInput errorMessage={props.errorMessage}>
    <input
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      className={props.className}
      readOnly={!props.onChange}
      onChange={props.onChange || null}
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
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string
};

export default RegularField;
