import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map, some } from 'lodash';

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
        <p className="recommendation-details-identity">{name}</p>
        <p className="recommendation-details-identity">{surname}</p>
        <p className="recommendation-details-salary">Wynagrodzenie: {requiredSalary} zł</p>
        <div className="recommendation-details-skills">
          <PresentationSkillList
            header={"Umiejętnośći"}
            items={skills}
            starRatedColor={"#28bd00"}
          />
          <PresentationSkillList
            header={"Języki"}
            items={languages}
            starRatedColor={"purple"}
          />
        </div>
        {some(certificates) &&
            <div className="recommendation-details-certificates-list">
              <h1>Certyfikaty</h1>
              {map(certificates, c => <p className="certificate">{c.title}</p>)}
            </div>
          }
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
