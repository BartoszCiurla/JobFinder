import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import Resources from '../resources';

import PresentationSkillList from '../../../../common/presentationSkillList';

import { getJobApplicationDetails, setJobApplicationDetails } from '../../../../actions/employee';
import { getUserCredentials } from '../../../../utils/auth';

class JobApplicationDetails extends Component {
  componentWillMount() {
    this.props.getJobApplicationDetails(this.props.jobApplicationId, getUserCredentials(this.props.cookies));
  }

  componentWillUnmount() {
    this.props.setJobApplicationDetails({});
  }

  render() {
    const {
      profession,
      professionCategory,
      skills,
      languages,
      certificates
    } = this.props.jobApplicationDetails;

    return (
      <div className="dashboard-details">
        <h1>{Resources.jobApplicationDetails}</h1>
        <p>{Resources.category}: {professionCategory}</p>
        <p>{Resources.profession}: {profession}</p>
        <PresentationSkillList header={Resources.skills} items={skills} />
        <PresentationSkillList header={Resources.languages} items={languages} />
        <PresentationSkillList header={Resources.certificates} items={certificates} />
      </div>
    );
  }
}

JobApplicationDetails.propTypes = {
  jobApplicationId: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  jobApplicationDetails: PropTypes.object,
  getJobApplicationDetails: PropTypes.func.isRequired,
  setJobApplicationDetails: PropTypes.func.isRequired
};

const mapStateToProps = ({ employee: { jobApplicationDetails } }) => ({
  jobApplicationDetails
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getJobApplicationDetails,
  setJobApplicationDetails
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(JobApplicationDetails));
