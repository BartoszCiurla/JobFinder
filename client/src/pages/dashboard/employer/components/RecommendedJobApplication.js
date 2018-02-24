import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecommendedJobApplication extends Component {
  render() {
    const {
      profession,
      professionCategory,
      score
    } = this.props;

    return (
      <div className="item">
        <h1>{profession}</h1>
        <h5>{professionCategory}</h5>
        <h5>{score}</h5>
      </div>
    );
  }
}

RecommendedJobApplication.propTypes = {
  id: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  professionCategory: PropTypes.string.isRequired,
  score: PropTypes.number,
};

export default RecommendedJobApplication;
