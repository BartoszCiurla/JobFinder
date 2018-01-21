import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Resources from './resources';

class DatePicker extends Component {
  constructor(props){
    super();
    const months = moment.localeData(props.language).months();
    const currentYear = new Date().getFullYear();
    const minimumYear = currentYear - 50;
    let years = [];

    for(let year = currentYear; year > minimumYear; year--) {
      years.push(year);
    }

    this.state = {
      months,
      years
    };
  }

  onChange = ({ target: { name, value } }) => (this.props.onChange(this.props.name,name,value))

  render() {
    return (
      <div>
        <select
          name="month"
          onChange={this.onChange}
          value={this.props.month}
          className="input">
          <option key="month" disabled="disabled" value="">{Resources.month}</option>
          {_.map(this.state.months, (m,index) => <option key={m} value={index + 1}>{m}</option>)}
        </select>
        <select
          name="year"
          onChange={this.onChange}
          value={this.props.year}
          className="input">
          <option key="Year" disabled="disabled" value="">{Resources.year}</option>
          {_.map(this.state.years, y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    );
  }
}

DatePicker.propTypes = {
  language: PropTypes.string,
  name: PropTypes.string.isRequired,
  month: PropTypes.string,
  year: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DatePicker;
