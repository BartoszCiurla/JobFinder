import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecommendedOffer extends Component {
  render() {
    const {
      id,
      score,
      companyName,
      onClick
    } = this.props;

    return (
      <div className="recommended-items-item" onClick={() => onClick(id)}>
        <div className="recommended-items-item-identity">{companyName}</div>
        <div className="recommended-items-item-score">{score.toFixed(3)}</div>
      </div>
    );
  }
}

RecommendedOffer.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number,
  companyName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RecommendedOffer;
