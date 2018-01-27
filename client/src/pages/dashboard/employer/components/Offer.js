import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Offer extends Component {
  render() {
    const { profession, professionCategory } = this.props.offer;
    return (
      <div className="offer">
        <h1>{profession}</h1>
        <h5>{professionCategory}</h5>
      </div>
    );
  }
}

Offer.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default Offer;
