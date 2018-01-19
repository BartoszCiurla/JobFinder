import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Resources from '../resources';
import RegularField from '../../../common/RegularField';
import ValidatedInput from '../../../common/ValidatedInput';

class PersonInformation extends Component {
  renderRegularField = (name, value, placeholder, type) => (
    <RegularField
      name={name}
      value={value}
      onChange={this.props.setRegularField}
      placeholder={placeholder}
      type={type}
      className="input"
      errorMessage={this.props.getErrorMessage(name)} />
  )

  render() {
    const {name, roleTitle, aboutYou} = this.props;

    return (
      <div>
        <div>
          <h2>{Resources.basicInformation}</h2>
        </div>
        {this.renderRegularField('name', name, Resources.name)}
        {this.renderRegularField('roleTitle', roleTitle, Resources.roleTitle)}
        <ValidatedInput errorMessage={this.props.getErrorMessage('aboutYou')}>
          <textarea
            rows="6"
            name="aboutYou"
            value={aboutYou}
            placeholder={Resources.aboutYou}
            onChange={this.props.setRegularField}
          />
        </ValidatedInput>
      </div>
    );
  }
}

PersonInformation.propTypes = {
  name: PropTypes.string,
  roleTitle: PropTypes.string,
  aboutYou: PropTypes.string,
  setRegularField: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
};

export default PersonInformation;
