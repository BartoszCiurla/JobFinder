import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import RegularField from '../../../../common/RegularField';

import Resources from './resources';

class AddedExperience extends Component {
  renderRegularField = (value) => (
    <RegularField
      name={name}
      value={value}
    />
  )

  renderSelect = (value) => (
    <select defaultValue={value}>
      <option value={value} disabled="disabled">{value}</option>
    </select>
  )

  renderDateField = (date, title) => {
    const month = moment.localeData('pl').months()[date.month -1];
    const year = date.year;

    return (
      <div style={{display: 'flex'}}>
        {title}
        {this.renderSelect(month)}
        {this.renderSelect(year)}
      </div>
    );
  }
  render() {
    const { company, role, startDate, finishDate, description } = this.props.experience;

    return (
      <div>
        {this.renderRegularField(company)}
        {this.renderDateField(startDate, Resources.startDate)}
        {this.renderDateField(finishDate, Resources.finishDate)}
        {this.renderRegularField(role)}
        <textarea
            rows="6"
            value={description}
            disabled={true}
        />
        <button onClick={() => this.props.removeExperience(this.props.experience)}>{Resources.removeExperiece}</button>
      </div>
    );
  }
}

AddedExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  removeExperience: PropTypes.func.isRequired
};

export default AddedExperience;
