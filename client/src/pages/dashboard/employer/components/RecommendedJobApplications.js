import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';

import RecommendedJobApplication from './RecommendedJobApplication';

class RecommendedJobApplications extends Component {
  componentWillMount() {
    this.props.getRecommendedApplications(this.props.offerId);
  }

  renderRecommendedJobApplications = (recommendedJobApplications) => {
    return recommendedJobApplications.map(rja =>
      (<RecommendedJobApplication
        key={rja.id}
        id={rja.id}
        profession={rja.profession}
        professionCategory={rja.professionCategory}
        score={rja.score}
      />)
    );
  }

  render() {
    const {
      recommendedJobApplications
    } = this.props;

    return some(recommendedJobApplications) ?
      this.renderRecommendedJobApplications(recommendedJobApplications)
      : <h1 className="no-items">
          Brak aplikacji
        </h1>;
  }
}

RecommendedJobApplications.propTypes = {
  offerId: PropTypes.string.isRequired,
  getRecommendedApplications: PropTypes.func.isRequired,
  recommendedJobApplications: PropTypes.array.isRequired
};

export default RecommendedJobApplications;
