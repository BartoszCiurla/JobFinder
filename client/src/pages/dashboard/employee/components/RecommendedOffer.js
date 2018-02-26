import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecommendedOffer extends Component {
  render() {
    const {
      score
    } = this.props;

    return (
      <div className="item">
        <h5>{score}</h5>
      </div>
    );
  }
}

RecommendedOffer.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number,
};

export default RecommendedOffer;
