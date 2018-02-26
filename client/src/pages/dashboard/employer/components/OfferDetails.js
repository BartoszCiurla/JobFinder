import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';

import PresentationSkillList from '../../../../common/presentationSkillList';

import { getOfferDetails, setOfferDetails } from '../../../../actions/employer';
import { getUserCredentials } from '../../../../utils/auth';
import Resources from '../resources';

class OfferDetails extends Component {
  componentWillMount() {
    this.props.getOfferDetails(this.props.offerId, getUserCredentials(this.props.cookies));
  }

  componentWillUnmount() {
    this.props.setOfferDetails({});
  }

  render() {
    const {
      profession,
      requiredSkills,
      welcomeSkills,
      certificatesWillBeAnAdvantage,
      languages
    } = this.props.offerDetails;

    return (
      <div className="offer-details">
        <h1>{Resources.offerDetails}</h1>
        <p>{Resources.profession}: {profession}</p>
        <PresentationSkillList header={Resources.requiredSkills} items={requiredSkills} />
        <PresentationSkillList header={Resources.welcomeSkills} items={welcomeSkills} />
        <PresentationSkillList header={Resources.languages} items={languages} />
        {certificatesWillBeAnAdvantage ? Resources.certificatesAreAnAdvantage : Resources.certificatesAreNotAnAdvantage}
      </div>
    );
  }
}

OfferDetails.propTypes = {
  offerId: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  offerDetails: PropTypes.object,
  getOfferDetails: PropTypes.func.isRequired,
  setOfferDetails: PropTypes.func.isRequired
};

const mapStateToProps = ({ employer: { offerDetails } }) => ({
  offerDetails
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOfferDetails,
  setOfferDetails
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(OfferDetails));
