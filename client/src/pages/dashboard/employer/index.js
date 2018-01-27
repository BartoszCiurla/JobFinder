import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';

import Resources from './resources';
import Routes from '../../../constants/routes';
import { getOffers } from '../../../actions/employer';
import { getUserCredentials } from '../../../utils/auth';

class Employer extends Component {
  componentWillMount() {
    this.props.getOffers(getUserCredentials(this.props.cookies));
  }
  render() {
    return (
      <div>
        <GlobalHeader />
        <DashboardBar
          title={Resources.employerDashboard}
          navigateTo={Routes.offerBuilder}
          linkTitle={Resources.addJobOffer}
        />
        <h1>Wybierz swoje oferty pracy</h1>
      </div>
    );
  }
}

Employer.propTypes = {
  isLoadingOffers: PropTypes.bool.isRequired,
  offers: PropTypes.array,
  getOffers: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

const mapStateToProps = ({ employer }) => ({
  isLoadingOffers: employer.isLoadingOffers,
  offers: employer.offers
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOffers
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Employer));
