import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import _ from 'lodash';

import RegularField from '../../common/RegularField';

import { validate } from '../../utils/validators/login';
import { login } from '../../actions/account';
import Resources from './resource';
import Routes from '../../constants/routes';

export class Login extends Component {
  state = {
    email: 'Employer@gmail.com',
    password: 'Employer1234',
    rememberMe: true,
    errors: []
  }

  login = () => {
    const validateResult = validate(this.state);

    this.setState({ errors: validateResult.errors });

    validateResult.isValid() && this.props.login(this.state)
      .then((data) => {
        if (data) {
          this.props.cookies.set('activeUser', data);
          const userType = data.userType.toLowerCase();
          this.props.history.push(Routes[userType]);
        }
      });
  }

  onChange = ({ target }) => (
    this.setState({ [target.name]: target.type === 'checkbox' ? target.checked : target.value })
  )

  onKeyPress = (event) => (event.key === 'Enter' && this.login())

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

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-container">
        <div className="form">
          <h2 className="title">{Resources.title}</h2>
          {this.renderRegularField('email', email, Resources.email)}
          {this.renderRegularField('password', password, Resources.password, 'password')}
          <button onClick={this.login} className="btn btn-primary full-width">{Resources.submit}</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

export default withCookies(withRouter(connect(null, mapDispatchToProps)(Login)));
