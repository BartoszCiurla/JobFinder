import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Experience from './Experience';
import AddedExperience from './AddedExperience';

class WorkExperience extends Component {
  renderAddedExperience = () => {
    const { workExperience, removeExperience } = this.props;

    return (
      _.map(workExperience, (we, i) =>(
        <AddedExperience
          key={i}
          experience={we}
          removeExperience={removeExperience}
        />
      )));
  }

  render() {
    const {
      title,
      tips
    } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h2>{tips}</h2>
        {this.renderAddedExperience()}
        <Experience
          addExperience={this.props.addExperience}
        />
      </div>
    );
  }
}

WorkExperience.propTypes = {
  title: PropTypes.string.isRequired,
  tips: PropTypes.string.isRequired,
  workExperience: PropTypes.array.isRequired,
  addExperience: PropTypes.func.isRequired,
  removeExperience: PropTypes.func.isRequired,
};

export default WorkExperience;
