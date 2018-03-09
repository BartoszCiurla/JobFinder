import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import { withCookies, Cookies } from 'react-cookie';
import Modal from 'react-modal';

import RecommendedOffer from './RecommendedOffer';
import RecommendedOfferDetails from './RecommendedOfferDetails';
import JobApplicationDetails from './JobApplicationDetails';

import Resources from '../resources';
import ModalStyles from '../../../../common/modalStyles';

class RecommendedOffers extends Component {
  state = {
    detailsOpen: false,
    details: {},
    selectedOfferId: ''
  }

  componentWillMount() {
    this.props.getRecommendedOffers(this.props.jobApplicationId);
  }

  openDetails = (id) => {
    this.setState({
      detailsOpen: true,
      selectedOfferId: id
    });
  }

  closeDetails = () => {
    this.setState({
      detailsOpen: false ,
      selectedOfferId: ''
    });
  }

  renderRecommendedOffers = (recommendedOffers) => {
    return recommendedOffers.map(ro =>
      (<RecommendedOffer
        key={ro.id}
        id={ro.id}
        score={ro.score}
        companyName={ro.companyName}
        onClick={this.openDetails}
      />)
    );
  }

  render() {
    const {
      recommendedOffers,
      jobApplicationId
    } = this.props;

    return (
      <div className="dashboard-container">
        <Modal
          isOpen={this.state.detailsOpen}
          onRequestClose={this.closeDetails}
          style={ModalStyles}>
          <RecommendedOfferDetails
            onClose={this.closeDetails}
            id={this.state.selectedOfferId}
          />
        </Modal>

        <JobApplicationDetails
          jobApplicationId={jobApplicationId}
        />
        <div className="recommended-items">
          {some(recommendedOffers) ?
            this.renderRecommendedOffers(recommendedOffers)
            : <h1 className="no-items">
              {Resources.noOffers}
            </h1>
          }
        </div>
      </div>
    );
  }
}

RecommendedOffers.propTypes = {
  getRecommendedOffers: PropTypes.func.isRequired,
  jobApplicationId: PropTypes.string.isRequired,
  recommendedOffers: PropTypes.array.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(RecommendedOffers);
