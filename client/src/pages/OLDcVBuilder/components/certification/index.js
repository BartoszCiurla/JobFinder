import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AddedCertification from './AddedCertification';
import Certification from './Certification';

import Resources from './resources';

class Certifications extends Component {
  renderAddedCertifications = () => {
    const { certifications, removeCertification } = this.props;

    return (
      _.map(certifications, (c, i) =>(
        <AddedCertification
          key={i}
          certification={c}
          removeCertification={removeCertification}
        />
      )));
  }
  render() {
    return (
      <div>
        <h2>{Resources.title}</h2>
        {this.renderAddedCertifications()}
        <Certification
          addCertification={this.props.addCertification}
        />
      </div>
    );
  }
}

Certifications.propTypes = {
  certifications: PropTypes.array.isRequired,
  addCertification: PropTypes.func.isRequired,
  removeCertification: PropTypes.func.isRequired
};

export default Certifications;
