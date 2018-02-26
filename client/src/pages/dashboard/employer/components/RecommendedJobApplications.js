import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import { withCookies, Cookies } from 'react-cookie';
import Modal from 'react-modal';

import OfferDetails from './OfferDetails';
import RecommendedJobApplication from './RecommendedJobApplication';
import RecommendedJobApplicationDetails from './RecommendedJobApplicationDetails';

import Resources from '../resources';
import ModalStyles from '../../../../common/modalStyles';
import { getUserCredentials } from '../../../../utils/auth';

class RecommendedJobApplications extends Component {
  state = {
    detailsOpen: false,
    details: {}
  }
  componentWillMount() {
    this.props.getRecommendedApplications(this.props.offerId);
  }

  openDetails = () => {
    this.setState({ detailsOpen: true });
  }

  closeDetails = () => {
    this.setState({ detailsOpen: false });
  }

  renderRecommendedJobApplications = (recommendedJobApplications) => {
    return recommendedJobApplications.map(rja =>
      (<RecommendedJobApplication
        key={rja.id}
        id={rja.id}
        name={rja.name}
        surname={rja.surname}
        score={rja.score}
        onClick={this.openDetails}
      />)
    );
  }

  render() {
    const {
      recommendedJobApplications,
      offerId
    } = this.props;

    return (
      <div className="dashboard-container">
        <Modal
          isOpen={this.state.detailsOpen}
          onRequestClose={this.closeDetails}
          style={ModalStyles}>
          <RecommendedJobApplicationDetails
            onClose={this.closeDetails}
          />
        </Modal>
        <OfferDetails
          offerId={offerId}
        />
        <div className="items">
          {some(recommendedJobApplications) ?
            this.renderRecommendedJobApplications(recommendedJobApplications)
            : <h1 className="no-items">
              {Resources.noJobApplications}
            </h1>
          }
        </div>
      </div>
    );
  }
}

RecommendedJobApplications.propTypes = {
  offerId: PropTypes.string.isRequired,
  getRecommendedApplications: PropTypes.func.isRequired,
  recommendedJobApplications: PropTypes.array.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(RecommendedJobApplications);
