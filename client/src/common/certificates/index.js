import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, find, map } from 'lodash';

import BasicAutocomplete from '../basicAutocomplete';
import ValidatedInput from '../../common/ValidatedInput';

import Resources from './resources';
import { validate } from '../../utils/validators/certificate';
import { getCertificates } from '../../actions/certificates';

class Certificates extends Component {
  state = {
    errors: [],
    title: ''
  }

  componentWillMount() {
    const { category } = this.props;
    isEmpty(this.props.proposedCertificates) && this.props.getCertificates(category);
  }

  getErrorMessage = (name) => (
    (find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  onChange = (value) => {
    this.setState({ title: value });
  }

  addItem = () => {
    const { title } = this.state;
    const validateResult = validate(title, this.props.addedCertificates);

    this.setState({ errors: validateResult.errors });

    if (validateResult.isValid()) {
      this.props.addCertificate(title);
      this.setState({ title: '' });
    }
  }

  renderAddedCertificates = () => {
    const { addedCertificates } = this.props;

    return (
      <div key="addedCertificates" className="added-items">
        {map(addedCertificates, ({ title }, index) =>
          (<div className="added-item" key={index}>
            {Resources.certificateTitle} :
            <span>{title}</span>
            <br />
            <button onClick={() => this.props.removeCertificate(title)} className="btn btn-primary full-width">{Resources.remove}</button>
          </div>))}
      </div>
    );
  }

  render() {
    const { isLoadingCertificates, proposedCertificates } = this.props;
    const { title } = this.state;

    return !isLoadingCertificates && [
      <div key="certificate">
        <ValidatedInput errorMessage={this.getErrorMessage('certificateTitle')}>
          <BasicAutocomplete
            value={title}
            onChange={this.onChange}
            placeholder={Resources.certificateTitle}
            items={proposedCertificates}
          />
        </ValidatedInput>
        <button onClick={this.addItem} className="btn btn-secondary full-width">{Resources.submit}</button>
      </div>,
      this.renderAddedCertificates()
    ];
  }
}

Certificates.propTypes = {
  category: PropTypes.string,
  getCertificates: PropTypes.func.isRequired,
  isLoadingCertificates: PropTypes.bool.isRequired,
  proposedCertificates: PropTypes.array,
  addedCertificates: PropTypes.array,
  addCertificate: PropTypes.func.isRequired,
  removeCertificate: PropTypes.func.isRequired
};

const mapStateToProps = ({ certificates: { isLoadingCertificates, proposedCertificates } }) => ({
  isLoadingCertificates,
  proposedCertificates: map(proposedCertificates, pc => pc.title)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCertificates
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);

