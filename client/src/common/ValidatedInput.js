import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

export default class ValidatedInput extends Component {
  render() {
    const { errorMessage, children, appendHtmlClass } = this.props;
    const hasErrors = _.some(errorMessage);
    const wrapperClass = classNames(appendHtmlClass, {
      'error': hasErrors
    });

    return (
      <div className={wrapperClass}>
        {children}
        {
          _.some(errorMessage) &&
          <p className="error-message">{errorMessage}</p>
        }
      </div>
    );
  }
}

ValidatedInput.propTypes = {
  errorMessage: PropTypes.string,
  children: PropTypes.object.isRequired,
  appendHtmlClass: PropTypes.string
};
