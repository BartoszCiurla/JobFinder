import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';

import Routes from '../../../constants/routes';
import Resources from './resources';

class Employee extends Component {
  render() {
    return (
      <div>
        <div className="dashboard-header-wrapper">
          <GlobalHeader />
          <DashboardBar
            title={Resources.employeeDashboard}
            leftNavigateTo={Routes.employee}
            leftLinkTitle={Resources.refreshTheView}
            rightNavigateTo={Routes.curriculumVitaeBuilder}
            rightLinkTitle={Resources.addCV}
          />
        </div>
        <h1 key>Wybierz swoje cv</h1>
      </div>
    );
  }
}

Employee.propTypes = {

};

export default Employee;
