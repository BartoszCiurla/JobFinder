import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { isEmpty } from 'lodash';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';
import JobApplication from './components/JobApplication';
import RecommendedOffers from './components/RecommendedOffers';

import Routes from '../../../constants/routes';
import Resources from './resources';
import { getJobApplications, setJobApplication, removeJobApplication, getRecommendedOffers } from '../../../actions/employee';
import { getUserCredentials } from '../../../utils/auth';

class Employee extends Component {
  componentWillMount() {
    this.props.getJobApplications(getUserCredentials(this.props.cookies));
  }

  renderJobApplications = () => {
    const { jobApplications } = this.props;
    return !isEmpty(jobApplications) && jobApplications.map(o =>
      (<JobApplication
        key={o.id}
        jobApplication={o}
        onClick={this.props.setJobApplication}
        onRemove={(id) => this.props.removeJobApplication(getUserCredentials(this.props.cookies), id)}
      />)
    );
  }

  getRecommendedOffers = (jobApplicationId) => {
    this.props.getRecommendedOffers(jobApplicationId, getUserCredentials(this.props.cookies));
  }

  render() {
    const { selectedJobApplication, recommendedOffers } = this.props;

    return (
      <div>
        <GlobalHeader />
        <DashboardBar
          title={Resources.employeeDashboard}
          navigateTo={Routes.applicationBuilder}
          linkTitle={Resources.addApplication}
          showLeftButton={!!selectedJobApplication}
          onClickLeftButton={() => this.props.setJobApplication('')}
          leftButtonTitle={Resources.back}
        />
        <div className="dashboard-content">
          {selectedJobApplication ? [
            <h1 key="offers" className="content-title">{Resources.recommendedOffers}</h1>,
            <RecommendedOffers
              key="recommendedOffers"
              recommendedOffers={recommendedOffers}
              getRecommendedOffers={this.getRecommendedOffers}
              jobApplicationId={selectedJobApplication}
            />
          ]
            : [
              <h1 key="offers" className="content-title">{Resources.chooseAJobApplication}</h1>,
              this.renderJobApplications()
            ]}
        </div>
      </div>
    );
  }
}

Employee.propTypes = {
  isLoadingJobApplications: PropTypes.bool.isRequired,
  jobApplications: PropTypes.array,
  getJobApplications: PropTypes.func.isRequired,
  setJobApplication: PropTypes.func.isRequired,
  getRecommendedOffers: PropTypes.func.isRequired,
  removeJobApplication: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  selectedJobApplication: PropTypes.string,
  recommendedOffers: PropTypes.array.isRequired
};

const mapStateToProps = ({ employee }) => ({
  isLoadingJobApplications: employee.isLoadingJobApplications,
  jobApplications: employee.jobApplications,
  selectedJobApplication: employee.selectedJobApplication,
  recommendedOffers: employee.recommendedOffers
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setJobApplication,
  getJobApplications,
  getRecommendedOffers,
  removeJobApplication
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Employee));
