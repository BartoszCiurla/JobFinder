import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import RegularField from '../RegularField';
import ValidatedInput from '../ValidatedInput';

import Resources from './resources';

class Skill extends Component {
  state = {
    skill: '',
    skillLevel: '',
    errors: []
  }

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  handleAddSkill = () => {
    const result = this.props.addSkill(this.state);
    this.setState({ errors: result.errors });

    result.isValid() &&
      this.setState({skill: '',skillLevel: ''});
  }

  onChange = ({ target: { name, value } }) => (this.setState({ [name]: value }))

  renderButton = (name, value, label, isSelected) => (
    <button
      key={value}
      style={{ backgroundColor: isSelected ? 'red' : 'white' }}
      onClick={this.onChange}
      value={value}
      name={name}>
      {label}
    </button>
  )

  render() {
    const { skill, skillLevel } = this.state;
    const { skillLevels } = this.props;

    return (
      <div>
        <RegularField
          name="skill"
          value={skill}
          onChange={this.onChange}
          placeholder={Resources.skill}
          className="input"
          errorMessage={this.getErrorMessage('skill')}
        />
        <ValidatedInput errorMessage={this.getErrorMessage('skillLevel')}>
          <div style={{ display: 'flex' }}>
            {skillLevels.map(sl =>
              this.renderButton('skillLevel', sl, Resources[sl], skillLevel === sl))
            }
          </div>
        </ValidatedInput>
        <button onClick={this.handleAddSkill}>{Resources.addSkill}</button>
      </div>
    );
  }
}

Skill.propTypes = {
  skillLevels: PropTypes.array.isRequired,
  addSkill: PropTypes.func,
};

export default Skill;
