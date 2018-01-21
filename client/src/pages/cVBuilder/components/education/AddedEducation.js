import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import RegularField from '../../../../common/RegularField';

import Resources from './resources';

class AddedEducation extends Component {
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
    const { schoolName, startDate, finishDate, description } = this.props.education;

    return (
      <div>
        {this.renderRegularField(schoolName)}
        {this.renderDateField(startDate, Resources.startDate)}
        {this.renderDateField(finishDate, Resources.finishDate)}
        <textarea
            rows="6"
            value={description}
            disabled={true}
        />
        <button onClick={() => this.props.removeEducation(this.props.education)}>{Resources.removeEducation}</button>
      </div>
    );
  }
}

AddedEducation.propTypes = {
  education: PropTypes.object.isRequired,
  removeEducation: PropTypes.func.isRequired
};

export default AddedEducation;
