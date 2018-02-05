import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { isEmpty } from 'lodash';

import GlobalHeader from '../../../common/globalHeader';
import DashboardBar from '../../../common/dashboardBar';
import Offer from './components/Offer';
import RecommendedApplications from './components/RecommendedApplications';

import Resources from './resources';
import Routes from '../../../constants/routes';
import { getOffers, setOffer, getRecommendedApplications } from '../../../actions/employer';
import { getUserCredentials } from '../../../utils/auth';

class Employer extends Component {
  componentWillMount() {
    this.props.getOffers(getUserCredentials(this.props.cookies));
  }

  renderOffers = () => {
    const { offers } = this.props;
    return !isEmpty(offers) && offers.map(o => <Offer key={o.id} offer={o} onClick={this.props.setOffer} />);
  }

  getRecommendedApplications = (offerId) => {
    this.props.getRecommendedApplications(offerId, getUserCredentials(this.props.cookies));
  }

  render() {
    const { selectedOffer } = this.props;

    return (
      <div>
        <GlobalHeader />
        <DashboardBar
          title={Resources.employerDashboard}
          navigateTo={Routes.offerBuilder}
          linkTitle={Resources.addJobOffer}
          showLeftButton={!!selectedOffer}
          onClickLeftButton={() => this.props.setOffer('')}
          leftButtonTitle={Resources.back}
        />
        <div className="dashboard-offers">
          {selectedOffer ? [
            <h1 key="offers" className="offers-title">{Resources.recommendedApplications}</h1>,
            <RecommendedApplications
              key="recommendedApplications"
              getRecommendedApplications={this.getRecommendedApplications}
              offerId={selectedOffer}
            />
          ]
            : [
              <h1 key="offers" className="offers-title">{Resources.chooseAJobOffer}</h1>,
              this.renderOffers()
            ]}
        </div>
      </div>
    );
  }
}

Employer.propTypes = {
  isLoadingOffers: PropTypes.bool.isRequired,
  offers: PropTypes.array,
  getOffers: PropTypes.func.isRequired,
  setOffer: PropTypes.func.isRequired,
  getRecommendedApplications: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  selectedOffer: PropTypes.string,
};

const mapStateToProps = ({ employer }) => ({
  isLoadingOffers: employer.isLoadingOffers,
  offers: employer.offers,
  selectedOffer: employer.selectedOffer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setOffer,
  getOffers,
  getRecommendedApplications
}, dispatch);

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Employer));
