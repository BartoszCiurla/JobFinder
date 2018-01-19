import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Resources from '../resources';
import RegularField from '../../../common/RegularField';

class Contact extends Component {
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
    const {email, phoneNumber} = this.props;

    return (
      <div>
        <div>
          <h2>{Resources.contactTitle}</h2>
        </div>
        {this.renderRegularField('email', email, Resources.email)}
        {this.renderRegularField('phoneNumber', phoneNumber, Resources.phoneNumber)}
      </div>
    );
  }
}

Contact.propTypes = {
  setRegularField: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  email: PropTypes.string,
  phoneNumber: PropTypes.string
};

export default Contact;
