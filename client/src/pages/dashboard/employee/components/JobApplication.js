import React, { Component } from 'react';
import PropTypes from 'prop-types';

class JobApplication extends Component {
  render() {
    const { profession, professionCategory, id } = this.props.jobApplication;
    return (
      <div onClick={() => this.props.onClick(id)} className="offer">
        <h1>{profession}</h1>
        <h5>{professionCategory}</h5>
      </div>
    );
  }
}

JobApplication.propTypes = {
  jobApplication: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default JobApplication;
