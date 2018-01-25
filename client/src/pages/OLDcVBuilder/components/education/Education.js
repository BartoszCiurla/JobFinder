import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import RegularField from '../../../../common/RegularField';
import ValidatedInput from '../../../../common/ValidatedInput';
import DatePicker from '../../../../common/datePicker';
import Resources from './resources';

class Education extends Component {
  state = {
    errors: [],
    schoolName: '',
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

  handleAddEducation = () => {
    const { schoolName, startDate, finishDate, description } = this.state;

    const result = this.props.addEducation({ schoolName, startDate, finishDate, description});
    this.setState({ errors: result.errors });

    result.isValid() &&
      this.setState({ schoolName: '', description: '', startDate: { month: '', year: ''}, finishDate: { month: '', year: ''} });
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
    const { schoolName, startDate, finishDate, description} = this.state;

    return (
      <div>
        {this.renderRegularField('schoolName', schoolName, Resources.schoolName)}
        {this.renderDatePicker('startDate', startDate.month, startDate.year, Resources.startDate)}
        {this.renderDatePicker('finishDate', finishDate.month, finishDate.year, Resources.finishDate)}
        <ValidatedInput errorMessage={this.getErrorMessage('description')}>
          <textarea
            rows="6"
            name="description"
            value={description}
            placeholder={Resources.description}
            onChange={this.onChange}
          />
        </ValidatedInput>
        <button onClick={this.handleAddEducation}>{Resources.submit}</button>
      </div>
    );
  }
}

Education.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default Education;
