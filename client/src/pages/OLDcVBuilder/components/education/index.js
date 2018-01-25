import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Education from './Education';
import AddedEducation from './AddedEducation';

import Resources from './resources';

class Educations extends Component {
  renderAddedEducation = () => {
    const { educations, removeEducation } = this.props;

    return (
      _.map(educations, (e, i) =>(
        <AddedEducation
          key={i}
          education={e}
          removeEducation={removeEducation}
        />
      )));
  }

  render() {
    const { addEducation } = this.props;

    return (
      <div>
        <h1>{Resources.title}</h1>
        <h2>{Resources.titleDescription}</h2>
        {this.renderAddedEducation()}
        <Education
          addEducation={addEducation}
        />
      </div>
    );
  }
}

Educations.propTypes = {
  educations: PropTypes.array.isRequired,
  addEducation: PropTypes.func.isRequired,
  removeEducation: PropTypes.func.isRequired
};

export default Educations;
