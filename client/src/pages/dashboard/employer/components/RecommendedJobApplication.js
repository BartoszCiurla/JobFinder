import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecommendedJobApplication extends Component {
  render() {
    const {
      name,
      surname,
      score,
      onClick
    } = this.props;

    return (
      <div className="item" onClick={onClick}>
        <h1>{`${name} ${surname}`}</h1>
        <h5>{score}</h5>
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
