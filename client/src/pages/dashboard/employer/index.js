import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';

import Resources from './resources';
import Routes from '../../../constants/routes';

class Employer extends Component {
  render() {
    return (
      <div>
        <GlobalHeader />
        <DashboardBar
          title={Resources.employerDashboard}
          navigateTo={Routes.offerBuilder}
          linkTitle={Resources.addJobOffer}
        />
        <h1>Wybierz swoje oferty pracy</h1>
      </div>
    );
  }
}

Employer.propTypes = {

};

export default Employer;
