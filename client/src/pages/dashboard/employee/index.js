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
        <GlobalHeader />
        <DashboardBar
          title={Resources.employeeDashboard}
          navigateTo={Routes.curriculumVitaeBuilder}
          linkTitle={Resources.addCV}
        />
        <h1 key>Wybierz swoje cv</h1>
      </div>
    );
  }
}

Employee.propTypes = {

};

export default Employee;
