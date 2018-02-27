import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PresentationSkillList from '../../../../common/presentationSkillList';

class RecommendedOfferDetails extends Component {
  render() {
    const {
      companyName,
      certificatesWillBeAnAdvantage,
      requiredSkills,
      welcomeSkills,
      languages
    } = this.props.details;

    return (
      <div>
        <p>{companyName}</p>
        <p>{certificatesWillBeAnAdvantage}</p>
        <PresentationSkillList
          header={"Wymagane umiejętności"}
          items={requiredSkills}
        />
        <PresentationSkillList
          header={"Mile widziane umiejętnośći"}
          items={welcomeSkills}
        />
        <PresentationSkillList
          header={"Języki"}
          items={languages}
        />
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
