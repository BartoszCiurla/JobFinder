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
      <div className="item" onClick={() => onClick(id)}>
        <h1>{companyName}</h1>
        <h5>{score}</h5>
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
