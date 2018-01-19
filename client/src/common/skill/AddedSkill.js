import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegularField from '../RegularField';
import ValidatedInput from '../ValidatedInput';

import Resources from './resources';

class AddedSkill extends Component {
  renderButton = (name, value, label, isSelected) => (
    <button
      key={value}
      style={{ backgroundColor: isSelected ? 'red' : 'white' }}
      value={value}
      disabled={true}
      name={name}>
      {label}
    </button>
  )

  render() {
    const { skill, skillLevel, skillLevels } = this.props;

    return (
      <div>
      <RegularField
        name="skill"
        value={skill}
        placeholder={Resources.skill}
        className="input"
      />
      <ValidatedInput>
        <div style={{ display: 'flex' }}>
          {skillLevels.map(sl =>
            this.renderButton('skillLevel', sl, Resources[sl], skillLevel === sl))
          }
        </div>
      </ValidatedInput>
      <button onClick={() => this.props.removeSkill(skill)}>{Resources.removeSkill}</button>
    </div>
    );
  }
}

AddedSkill.propTypes = {
  skill: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  skillLevels: PropTypes.array.isRequired,
  removeSkill: PropTypes.func.isRequired
};

export default AddedSkill;
