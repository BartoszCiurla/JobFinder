import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PresentationSkillList from '../../../../common/presentationSkillList';

import Resources from '../resources';

class RecommendedOfferDetails extends Component {
  render() {
    const {
      companyName,
      requiredSkills,
      welcomeSkills,
      languages,
      certificatesWillBeAnAdvantage
    } = this.props.details;

    return (
      <div className="recommendation-details">
        <p className="recommendation-details-company-name">{companyName}</p>
        <div className="recommendation-details-skills">
          <PresentationSkillList
            header={"Wymagane"}
            items={requiredSkills}
            starRatedColor={"#f2442e"}
          />
          <PresentationSkillList
            header={"Mile widziane"}
            items={welcomeSkills}
            starRatedColor={"#28bd00"}
          />
          <PresentationSkillList
            header={"Języki"}
            items={languages}
            starRatedColor={"purple"}
          />
        </div>
        <p className="recommendation-details-certificates">
          {certificatesWillBeAnAdvantage ? Resources.certificatesAreAnAdvantage : Resources.certificatesAreNotAnAdvantage}
        </p>
      </div>
    );
  }
}

RecommendedOfferDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object,
  id: PropTypes.string.isRequired
};

const mapStateToProps = ({ employee: { recommendedOffers } }, { id }) => ({
  details: recommendedOffers.find(ro => ro.id === id)
});


export default connect(mapStateToProps)(RecommendedOfferDetails);
