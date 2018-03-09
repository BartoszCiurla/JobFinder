import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import Resources from '../resources';
import _ from 'lodash';

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
      certifcates
    } = this.props.jobApplicationDetails;
    console.log(certifcates);

    return (
      <div className="dashboard-details">
        <h1>{Resources.jobApplicationDetails}</h1>
        <div className="dashboard-details-application-details">
          <p><span className="ddad-category">{Resources.category}:</span> {professionCategory}</p>
          <p><span className="ddad-profession">{Resources.profession}:</span> {profession}</p>
        </div>
        <PresentationSkillList header={Resources.skills} items={skills} starRatedColor={"#28bd00"} />
        <PresentationSkillList header={Resources.languages} items={languages} starRatedColor={"purple"} />
        {_.some(certifcates) &&
          <div className="certificates-list">
            <h1>{Resources.certificates}</h1>
            {_.map(certifcates, (c, index) => <p className="certificate" key={index}>{c.title}</p>)}
          </div>
        }
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
