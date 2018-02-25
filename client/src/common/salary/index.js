import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ValidatedInput from '../ValidatedInput';
import Resources from './resources';

class Salary extends Component {
  getErrorMessage = (name) => (
    (_.find(this.props.errors, e => e.attribute === name) || { message: '' }).message
  )

  render() {
    const {
      salary,
      onChange
    } = this.props;
    return (
      <ValidatedInput errorMessage={this.getErrorMessage("salary")}>
        <input
          placeholder={Resources.salary}
          className="input"
          type="number"
          onChange={(event) => onChange({ name: 'salary', value: event.target.value })}
          value={salary}
        />
      </ValidatedInput>
    );
  }
}

Salary.propTypes = {
  salary: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

export default Salary;
