import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Skill from './Skill';
import AddedSkill from './AddedSkill';

class Skills extends Component {
  renderAddedSkills = () => {
    const { skills, skillLevels } = this.props;

    return (_.map(skills, item =>
      (<AddedSkill
        key={item.skill}
        skill={item.skill}
        skillLevel={item.skillLevel}
        skillLevels={skillLevels}
        removeSkill={this.props.removeSkill}
      />)));
  }

  render() {
    const {skills, skillLevels, title, tips} = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h2>{tips}</h2>
        {this.renderAddedSkills()}
        <Skill
          key="AddSkill"
          skillLevels={skillLevels}
          addedSkills={skills}
          addSkill={this.props.addSkill}
        />
      </div>
    );
  }
}

Skills.propTypes = {
  title: PropTypes.string.isRequired,
  tips: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  skillLevels: PropTypes.array.isRequired,
};

export default Skills;
