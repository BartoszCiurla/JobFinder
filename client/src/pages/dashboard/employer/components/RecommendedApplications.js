import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import Resources from '../resources';

class RecommendedApplications extends Component {
  componentWillMount() {
    this.props.getRecommendedApplications(this.props.offerId);
  }

  render() {
    return (
      <div />
    );
  }
}

RecommendedApplications.propTypes = {
  offerId: PropTypes.string.isRequired,
  getRecommendedApplications: PropTypes.func.isRequired
};

export default RecommendedApplications;
