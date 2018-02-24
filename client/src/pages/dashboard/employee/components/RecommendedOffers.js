import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';

import RecommendedOffer from './RecommendedOffer';

class RecommendedOffers extends Component {
  componentWillMount() {
    this.props.getRecommendedOffers(this.props.jobApplicationId);
  }

  renderRecommendedOffers = (recommendedOffers) => {
    return recommendedOffers.map(ro =>
      (<RecommendedOffer
        key={ro.id}
        id={ro.id}
        profession={ro.profession}
        professionCategory={ro.professionCategory}
        score={ro.score}
      />)
    );
  }

  render() {
    const {
      recommendedOffers
    } = this.props;
    return some(recommendedOffers) ?
      this.renderRecommendedOffers(recommendedOffers)
      : <h1 className="no-items">
          Brak ofert
        </h1>;
  }
}

RecommendedOffers.propTypes = {
  getRecommendedOffers: PropTypes.func.isRequired,
  jobApplicationId: PropTypes.string.isRequired,
  recommendedOffers: PropTypes.array.isRequired
};

export default RecommendedOffers;
