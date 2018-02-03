import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import BasicAutocomplete from '../basicAutocomplete';
import ValidatedInput from '../../common/ValidatedInput';

import Resources from './resources';
import { validate } from '../../utils/validators/skill';
import { getSkills } from '../../actions/skills';

class Skills extends Component {
  state = {
    errors: [],
    skill: {
      description: '',
      level: 0
    }
  }

  componentWillMount() {
    const { category, profession } = this.props;
    this.props.getSkills(category, profession);
  }

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  addItem = () => {
    const { skill } = this.state;
    const { customValidation } = this.props;
    const validateResult = customValidation ? customValidation(skill, this.props.addedSkills) : validate(skill, this.props.addedSkills);

    this.setState({ errors: validateResult.errors });

    if (validateResult.isValid()) {
      this.props.addSkill(skill);
      this.setState({ skill: { level: 0, description: '' } });
    }
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
      <input type="radio" onClick={this.onChangeLevel} value={value} id={`radio${value}`} name="skillLevel" checked={value === level} />
      <label htmlFor={`radio${value}`}>{Resources[value]}</label>
    </div>
  );

  renderAddedSkills = () => {
    const { addedSkills } = this.props;
    return (
      <div key="addedSkils" className="added-items">
        {addedSkills.map(({ description, level }, index) =>
          (<div className="added-item" key={index}>
            {Resources.skillTitle} :
            <span>{description}</span>
            <br />
            {Resources.levelTitle} :
            <span>{Resources[level].toLowerCase()}</span>
            <button onClick={() => this.props.removeSkill({ description, level })} className="btn btn-primary full-width">{Resources.remove}</button>
          </div>))}
      </div>
    );
  }

  render() {
    const { isLoadingSkills, proposedSkills } = this.props;
    const { skill } = this.state;
    const { description, level } = skill;

    return !isLoadingSkills && [
      <div key="skill">
        <ValidatedInput errorMessage={this.getErrorMessage('skillDescription')}>
          <BasicAutocomplete
            value={description}
            onChange={this.onChangeDescription}
            placeholder={Resources.skillDescription}
            items={proposedSkills}
          />
        </ValidatedInput>
        <ValidatedInput errorMessage={this.getErrorMessage('skillLevel')}>
          <div className="level-scale" key="scale">
            <p>{Resources.skillLevel}</p>
            {this.renderLevelScale(5, level)}
          </div>
        </ValidatedInput>
        <button onClick={this.addItem} className="btn btn-secondary full-width">{Resources.submit}</button>
      </div>,
      this.renderAddedSkills()
    ];
  }
}

Skills.propTypes = {
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  addedSkills: PropTypes.array,
  customValidation: PropTypes.func,
  getSkills: PropTypes.func.isRequired,
  isLoadingSkills: PropTypes.bool.isRequired,
  proposedSkills: PropTypes.array,
  category: PropTypes.string,
  profession: PropTypes.string
};

const mapStateToProps = ({ skills: { isLoadingSkills, proposedSkills } }) => ({
  isLoadingSkills,
  proposedSkills: proposedSkills.map(x => x.description)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSkills
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
