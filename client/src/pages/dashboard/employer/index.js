import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { isEmpty } from 'lodash';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';
import Offer from './components/Offer';

import Resources from './resources';
import Routes from '../../../constants/routes';
import { getOffers } from '../../../actions/employer';
import { getUserCredentials } from '../../../utils/auth';

class Employer extends Component {
  componentWillMount() {
    this.props.getOffers(getUserCredentials(this.props.cookies));
  }

  renderOffers = () => {
    const { offers } = this.props;
    return !isEmpty(offers) && this.props.offers.map(o => <Offer key={o.id} offer={o} />);
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
        <h1 className="offers-title">{Resources.chooseAJobOffer}</h1>
        <div className="dashboard-offers">
          {this.renderOffers()}
        </div>
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
