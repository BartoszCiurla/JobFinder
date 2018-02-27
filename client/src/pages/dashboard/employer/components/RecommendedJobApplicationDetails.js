import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

import PresentationSkillList from '../../../../common/presentationSkillList';

class RecommendedJobApplicationDetails extends Component {
  render() {
    const {
      name,
      surname,
      requiredSalary,
      skills,
      languages,
      certificates
    } = this.props.details;
    return (
      <div className="recommendation-details">
        <p>{name}</p>
        <p>{surname}</p>
        <p>{requiredSalary}</p>
        <div className="job-application-details-container">
          <PresentationSkillList
            header={"Umiejętnośći"}
            items={skills}
          />
          <PresentationSkillList
            header={"Języki"}
            items={languages}
          />
          <p>Certyfikaty</p>
          {map(certificates, c => <p>{c.description}</p>)}
        </div>
      </div>
    );
  }
}

RecommendedJobApplicationDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object,
  id: PropTypes.string.isRequired
};

const mapStateToProps = ({ employer: { recommendedJobApplications } }, { id }) => ({
  details: recommendedJobApplications.find(rja => rja.id === id)
});


export default connect(mapStateToProps)(RecommendedJobApplicationDetails);
