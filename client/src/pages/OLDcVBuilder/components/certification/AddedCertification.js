import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import RegularField from '../../../../common/RegularField';
import Resources from './resources';

class AddedCertification extends Component {
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
    const { certificateName, finishDate} = this.props.certification;

    return (
      <div>
        <RegularField
          name={'certificateName'}
          value={certificateName}
        />
        {this.renderDateField(finishDate, Resources.finishDate)}
        <button onClick={() => this.props.removeCertification(this.props.certification)}>{Resources.removeCertification}</button>
      </div>
    );
  }
}

AddedCertification.propTypes = {
  certification: PropTypes.object.isRequired,
  removeCertification: PropTypes.func.isRequired,
};

export default AddedCertification;
