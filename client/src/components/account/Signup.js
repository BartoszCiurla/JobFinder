import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import RegularField from '../shared/RegularField';
import ValidatedInput from '../shared/ValidatedInput';

import { validate } from '../../utils/validators/signup';
import { createAccount, getUserTypes } from '../../actions/account';

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

  componentWillMount(){
    _.isEmpty(this.props.userTypes) && this.props.getUserTypes();
  }

  createAccount = () => {
    const validateResult = validate(this.state);

    this.setState({ errors: validateResult.errors });
    validateResult.isValid() && this.props.createAccount(this.state)
      .then((result) => result && this.props.history.push(`/`));
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
          onKeyPress={this.onKeyPress}
        >
          <option disabled="disabled" value="">User type</option>
          {this.props.userTypes.map(ut => <option key={ut} value={ut}>{ut}</option>)}
        </select>
    </ValidatedInput>
  )

  render() {
    const { surname, name, email, password, passwordConfirmation, userType } = this.state;

    return (
      <div className="">
        <h2 className="">Sign Up</h2>
        {this.renderRegularField('surname', surname, 'Surname')}
        {this.renderRegularField('name', name, 'Name')}
        {this.renderRegularField('email', email, 'Email')}
        {this.renderUserTypeSelector(userType)}
        {this.renderRegularField('password', password, 'Password', 'password')}
        {this.renderRegularField('passwordConfirmation', passwordConfirmation, 'Confirm password', 'password')}
        <button onClick={this.createAccount} className="btn btn-primary full-width">Sign Up</button>
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
