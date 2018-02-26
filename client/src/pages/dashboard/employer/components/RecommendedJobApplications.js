import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';

import RecommendedJobApplication from './RecommendedJobApplication';
import OfferDetails from './OfferDetails';

import Resources from '../resources';

class RecommendedJobApplications extends Component {
  componentWillMount() {
    this.props.getRecommendedApplications(this.props.offerId);
  }

  renderRecommendedJobApplications = (recommendedJobApplications) => {
    return recommendedJobApplications.map(rja =>
      (<RecommendedJobApplication
        key={rja.id}
        id={rja.id}
        name={rja.name}
        surname={rja.surname}
        profession={rja.profession}
        professionCategory={rja.professionCategory}
        score={rja.score}
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
  recommendedJobApplications: PropTypes.array.isRequired
};

export default RecommendedJobApplications;
