import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';

class Offer extends Component {
  render() {
    const {
      offer:
      {
        profession,
        professionCategory,
        id
      },
      onRemove,
      onClick
    } = this.props;

    return (
      <div className="item">
        <h1>{profession}</h1>
        <h5>{professionCategory}</h5>
        <span className="close">
          <FaClose onClick={() => onRemove(id)} color={'#f2442e'} size={25} />
        </span>
        <span className="details">
          <FaInfoCircle onClick={() => onClick(id)} size={25} />
        </span>
      </div>
    );
  }
}

Offer.propTypes = {
  offer: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Offer;
