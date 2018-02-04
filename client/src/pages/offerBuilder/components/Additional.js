import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Resources from './resources';

class Additional extends Component {
  onChange = ({ target }) => {
    const { setRegularField } = this.props;
    const actions = {
      certificatesWillBeAnAdvantage: (tar) => ({ name: tar.name, value: tar.checked })
    };

    setRegularField(actions[target.name](target));
  }
  render() {
    const {
      certificatesWillBeAnAdvantage
    } = this.props;

    return (
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
    );
  }
}

Additional.propTypes = {
  certificatesWillBeAnAdvantage: PropTypes.bool.isRequired,
  setRegularField: PropTypes.func.isRequired
};

export default Additional;
