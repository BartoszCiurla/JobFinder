import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';

import RecommendedOffer from './RecommendedOffer';
import JobApplicationDetails from './JobApplicationDetails';

import Resources from '../resources';

class RecommendedOffers extends Component {
  componentWillMount() {
    this.props.getRecommendedOffers(this.props.jobApplicationId);
  }

  renderRecommendedOffers = (recommendedOffers) => {
    return recommendedOffers.map(ro =>
      (<RecommendedOffer
        key={ro.id}
        id={ro.id}
        score={ro.score}
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
        <JobApplicationDetails
          jobApplicationId={jobApplicationId}
        />
        <div className="items">
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
  recommendedOffers: PropTypes.array.isRequired
};

export default RecommendedOffers;
