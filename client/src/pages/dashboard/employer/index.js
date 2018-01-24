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
        <div className="dashboard-header-wrapper">
          <GlobalHeader />
          <DashboardBar
            title={Resources.employerDashboard}
            leftNavigateTo={Routes.employer}
            leftLinkTitle={Resources.refreshTheView}
            rightNavigateTo={Routes.jobOfferBuilder}
            rightLinkTitle={Resources.addJobOffer}
          />
        </div>
        <h1>Wybierz swoje oferty pracy</h1>
      </div>
    );
  }
}

Employer.propTypes = {

};

export default Employer;
