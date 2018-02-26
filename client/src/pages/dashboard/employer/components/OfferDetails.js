import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';

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
      salary
    } = this.props.offerDetails;

    return (
      <div className="offer-details">
        <h1>{Resources.offerDetails}</h1>
        <p>{Resources.profession}: {profession}</p>
        <p>{Resources.salary} {salary} </p>
      </div>
    );
  }
}

OfferDetails.propTypes = {
  offerId: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  offerDetails: PropTypes.shape({
    certificatesWillBeAnAdvantagetrue: PropTypes.bool.isRequired,
    profession: PropTypes.string.isRequired,
    professionCategory: PropTypes.string.isRequired,
    requiredSkills: PropTypes.array,
    salary: PropTypes.number.isRequired,
    welcomeSkills: PropTypes.array,
    languages: PropTypes.array
  }),
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
