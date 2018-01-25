import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import RegularField from '../../../../common/RegularField';
import ValidatedInput from '../../../../common/ValidatedInput';
import DatePicker from '../../../../common/datePicker';
import Resources from './resources';

class Experience extends Component {
  state = {
    errors: [],
    company: '',
    role: '',
    startDate: {
      month: '',
      year: ''
    },
    finishDate: {
      month: '',
      year: ''
    },
    description:''
  }

  getErrorMessage = (name) => ((_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message)

  onChange = ({ target: { name, value } }) => (this.setState({ [name]: value }))

  onChangeDate = (dateName, name, value) => {
    let date = this.state[dateName];
    date[name] = value;

    this.setState({date});
  }

  handleAddExperience = () => {
    const { company, role, startDate, finishDate, description } = this.state;

    const result = this.props.addExperience({ company, role, startDate, finishDate, description});
    this.setState({ errors: result.errors });

    result.isValid() &&
      this.setState({company: '', role: '', description: '', startDate: { month: '', year: ''}, finishDate: { month: '', year: ''}});
  }

  renderRegularField = (name, value, placeholder, type) => (
    <RegularField
      name={name}
      value={value}
      onChange={this.onChange}
      placeholder={placeholder}
      type={type}
      className="input"
      errorMessage={this.getErrorMessage(name)}
    />
  )

  renderDatePicker = (name, month, year, title) => {
    return (
      <ValidatedInput errorMessage={this.getErrorMessage(name)}>
        <div style={{ display: 'flex' }}>
          {title}
          <DatePicker
            language="pl"
            name={name}
            month={month}
            year={year}
            onChange={this.onChangeDate}
          />
        </div>
      </ValidatedInput>
    );
  }

  render() {
    const { company, role, startDate, finishDate, description } = this.state;

    return (
      <div>
        {this.renderRegularField('company', company, Resources.company)}
        {this.renderDatePicker('startDate', startDate.month, startDate.year, Resources.startDate)}
        {this.renderDatePicker('finishDate', finishDate.month, finishDate.year, Resources.finishDate)}
        {this.renderRegularField('role', role, Resources.role)}
        <ValidatedInput errorMessage={this.getErrorMessage('description')}>
          <textarea
            rows="6"
            name="description"
            value={description}
            placeholder={Resources.description}
            onChange={this.onChange}
          />
        </ValidatedInput>
        <button onClick={this.handleAddExperience}>{Resources.submit}</button>
      </div>
    );
  }
}

Experience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default Experience;
