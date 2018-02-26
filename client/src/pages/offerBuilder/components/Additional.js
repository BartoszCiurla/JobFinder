import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import Resources from './resources';

import ValidatedInput from '../../../common/ValidatedInput';

class Additional extends Component {
  getErrorMessage = (name) => (
    (find(this.props.errors, e => e.attribute === name) || { message: '' }).message
  )

  onChange = ({ target }) => {
    const { setRegularField } = this.props;
    const actions = {
      certificatesWillBeAnAdvantage: (tar) => ({ name: tar.name, value: tar.checked }),
      companyName: (tar) => ({ name: tar.name, value: tar.value })
    };

    setRegularField(actions[target.name](target));
  }
  render() {
    const {
      certificatesWillBeAnAdvantage,
      companyName
    } = this.props;

    return (
      <div>
        <ValidatedInput errorMessage={this.getErrorMessage("companyName")}>
          <input
            className="input"
            name={"companyName"}
            placeholder={Resources.companyName}
            onChange={this.onChange}
            value={companyName}
          />
        </ValidatedInput>
        <div className="level-scale">
          <div>
            <input
              name="certificatesWillBeAnAdvantage"
              type="checkbox"
              onChange={this.onChange}
              id={`certificates`}
              checked={certificatesWillBeAnAdvantage}
            />
            <label htmlFor={`certificates`}>{Resources.certificates}</label>
          </div>
        </div>
      </div>
    );
  }
}

Additional.propTypes = {
  certificatesWillBeAnAdvantage: PropTypes.bool.isRequired,
  companyName: PropTypes.string.isRequired,
  setRegularField: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
};

export default Additional;
