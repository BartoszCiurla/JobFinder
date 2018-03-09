import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecommendedJobApplication extends Component {
  render() {
    const {
      id,
      name,
      surname,
      score,
      onClick
    } = this.props;

    return (
      <div className="recommended-items-item" onClick={() => onClick(id)}>
        <div className="recommended-items-item-identity">{name}</div>
        <div className="recommended-items-item-identity">{surname}</div>
        <div className="recommended-items-item-score">{score.toFixed(3)}</div>
      </div>
    );
  }
}

RecommendedJobApplication.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  score: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default RecommendedJobApplication;
