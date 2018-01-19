import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import RegularField from '../../common/RegularField';
import ValidatedInput from '../../common/ValidatedInput';

import { createJobOffer } from '../../actions/jobOffer';

import Resources from './resources';
import { validate } from '../../utils/validators/jobOffer';

class JobOfferBuilder extends Component {
  state = {
    title: '',
    errors: []
  }

  onChange = ({ target: { name, value } }) => (
    this.setState({ [name]: value })
  )

  onKeyPress = (event) => (event.key === 'Enter' && this.createJobOffer());

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  renderLabel = (text) => {
    return (
      <div className="">
        {text}
      </div>
    );
  }

  renderRegularField = (name, value, placeholder, type) => (
    <RegularField
      name={name}
      value={value}
      onChange={this.onChange}
      onKeyPress={this.onKeyPress}
      placeholder={placeholder}
      type={type}
      className="input"
      errorMessage={this.getErrorMessage(name)} />
  )

  createJobOffer = () => {
    const validateResult = validate(this.state);

    this.setState({ errors: validateResult.errors });
    validateResult.isValid() && this.props.createJobOffer(this.state);
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <h2>OMFG</h2>
        {this.renderLabel(Resources.title)}
        <ValidatedInput errorMessage={this.getErrorMessage('title')}>
          <textarea
            rows="6"
            name="title"
            value={title}
            placeholder={Resources.titleExample}
            onChange={this.onChange}
          />
        </ValidatedInput>
        <button onClick={this.createJobOffer} className="btn btn-primary full-width">Create</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createJobOffer
}, dispatch);

JobOfferBuilder.propTypes = {
  createJobOffer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(JobOfferBuilder);
