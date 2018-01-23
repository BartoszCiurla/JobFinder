import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import RegularField from '../../common/RegularField';
import ValidatedInput from '../../common/ValidatedInput';

import { validate } from '../../utils/validators/signup';
import { createAccount, getUserTypes } from '../../actions/account';
import Routes from '../../constants/routes';
import Resources from './resource';

export class Signup extends Component {
  state = {
    surname: '',
    name: '',
    email: '',
    userType: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  }

  componentWillMount() {
    _.isEmpty(this.props.userTypes) && this.props.getUserTypes();
  }

  createAccount = () => {
    const validateResult = validate(this.state);

    this.setState({ errors: validateResult.errors });
    validateResult.isValid() && this.props.createAccount(this.state)
      .then((result) => result && this.props.history.push(Routes.homePage));
  }

  onChange = ({ target: { name, value } }) => (
    this.setState({ [name]: value })
  )

  onKeyPress = (event) => (event.key === 'Enter' && this.createAccount())

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  renderRegularField = (name, value, placeholder, type) => (
    <RegularField
      name={name}
      value={value}
      onChange={this.onChange}
      onKeyPress={this.onKeyPress}
      placeholder={placeholder}
      type={type}
      className="input"
      errorMessage={this.getErrorMessage(name)} />
  )

  renderUserTypeSelector = (userType) => (
    <ValidatedInput errorMessage={this.getErrorMessage('userType')}>
      <select
        name="userType"
        className="input"
        defaultValue={userType}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}>
        <option disabled="disabled" value="">{Resources.userType}</option>
        {this.props.userTypes.map(ut => <option key={ut} value={ut}>{Resources[ut]}</option>)}
      </select>
    </ValidatedInput>
  )

  render() {
    const { surname, name, email, password, passwordConfirmation, userType } = this.state;

    return (
      <div className="signup-container">
        <div className="form">
          <h2 className="title">{Resources.title}</h2>
          {this.renderRegularField('surname', surname, Resources.surname)}
          {this.renderRegularField('name', name, Resources.name)}
          {this.renderRegularField('email', email, Resources.email)}
          {this.renderUserTypeSelector(userType)}
          {this.renderRegularField('password', password, Resources.password, 'password')}
          {this.renderRegularField('passwordConfirmation', passwordConfirmation, Resources.passwordConfirmation, 'password')}
          <button onClick={this.createAccount} className="btn btn-primary full-width">{Resources.submit}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  userTypes: account.userTypes
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createAccount,
  getUserTypes
}, dispatch);

Signup.propTypes = {
  createAccount: PropTypes.func.isRequired,
  getUserTypes: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userTypes: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
