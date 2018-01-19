/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home';
import Signup from './signup';
import Login from './login';
import JobOfferBuilder from './jobOfferBuilder';
import CurriculumVitaeBuilder from './curriculumVitaeBuilder';
import GlobalHeader from '../common/GlobalHeader';

import Routes from '../constants/routes';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {
  render() {
    return (
      <div>
        <GlobalHeader/>
        <Switch>
          <Route exact path={Routes.homePage} component={HomePage} />
          <Route path={Routes.signup} component={Signup} />
          <Route path={Routes.login} component={Login} />
          <Route path={Routes.jobOfferBuilder} component={JobOfferBuilder}/>
          <Route path={Routes.curriculumVitaeBuilder} component={CurriculumVitaeBuilder}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
