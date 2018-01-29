/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import PrivateRoute from 'react-router-private-route';

import HomePage from './home';
import Signup from './signup';
import Login from './login';
import Employer from './dashboard/employer';
import Employee from './dashboard/employee';
import OfferBuilder from './offerBuilder';
import ApplicationBuilder from './applicationBuilder';

import Routes from '../constants/routes';
import { getUserTypes } from '../utils/auth';

class App extends Component {

  render() {
    const {
      isEmployee,
      isEmployer
    } = getUserTypes(this.props.cookies);

    return (
        <Switch>
          <Route exact path={Routes.homePage} component={HomePage} />
          <Route path={Routes.signup} component={Signup} />
          <Route path={Routes.login} component={Login} />
          <PrivateRoute path={Routes.employee} redirect={Routes.login} component={Employee} auth={isEmployee} />
          <PrivateRoute path={Routes.applicationBuilder} redirect={Routes.login} component={ApplicationBuilder} auth={isEmployee} />
          <PrivateRoute path={Routes.employer} redirect={Routes.login} component={Employer} auth={isEmployer} />
          <PrivateRoute path={Routes.offerBuilder} redirect={Routes.login} component={OfferBuilder} auth={isEmployer} />
        </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

const mapStateToProps = ({ routing }) => ({
  location: routing.location,
});

export default withCookies(withRouter(connect(mapStateToProps)(App)));
