import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BasicAutocomplete from '../basicAutocomplete';
import ValidatedInput from '../../common/ValidatedInput';

import Resources from './resources';

class Skills extends Component {
  state = {
    skill: {
      description: '',
      level: 0
    },
    items: [
      'c',
      'cw',
      'cwe',
      'cwel'
    ]
  }
  onChangeDescription = (value) => {
    this.setState({ skill: { ...this.state.skill, description: value } });
  }

  onChangeLevel = ({ target: { value } }) => {
    this.setState({ skill: { ...this.state.skill, level: parseInt(value) } });
  }

  renderLevelScale = (scale, level) => {
    const levels = [];
    for (let i = 1; i <= scale; i++) {
      levels[i - 1] = this.renderRadioInput(i, level);
    }
    return levels;
  }

  renderRadioInput = (value, level) => (
    <div key={value}>
      <input className="radio" onClick={this.onChangeLevel} type="radio" id={`radio${value}`} value={value} name="radio-group" checked={value === level} />
      <label htmlFor={`radio${value}`}>{Resources[value]}</label>
    </div>
  )

  render() {
    const { skill, items } = this.state;
    const { description, level } = skill;
    const { placeholder } = this.props;

    return [
      <div key="skill" className="skill-form">
        <ValidatedInput errorMessage="">
          <BasicAutocomplete
            value={description}
            onChange={this.onChangeDescription}
            placeholder={placeholder}
            items={items}
          />
        </ValidatedInput>
        <ValidatedInput errorMessage="">
          <div className="level-scale" key="scale">
            <p>{Resources.skillLevel}</p>
            {this.renderLevelScale(5, level)}
          </div>
        </ValidatedInput>
      </div>
    ];
  }
}

Skills.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Skills;
