import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, find, map } from 'lodash';

import BasicAutocomplete from '../basicAutocomplete';
import ValidatedInput from '../../common/ValidatedInput';

import Resources from './resources';
import { validate } from '../../utils/validators/language';
import { getLanguages } from '../../actions/languages';

class Languages extends Component {
  state = {
    errors: [],
    language: {
      description: '',
      level: 0
    }
  }

  componentWillMount() {
    isEmpty(this.props.proposedLanguages) && this.props.getLanguages();
  }

  getErrorMessage = (name) => (
    (find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  addItem = () => {
    const { language } = this.state;
    const validateResult = validate(language, this.props.addedLanguages);

    this.setState({ errors: validateResult.errors });

    if (validateResult.isValid()) {
      this.props.addLanguage(language);
      this.setState({ language: { description: '', level: 0 } });
    }
  }

  onChangeName = (value) => {
    this.setState({ language: { ...this.state.language, description: value } });
  }

  onChangeLevel = ({ target: { value } }) => {
    this.setState({ language: { ...this.state.language, level: parseInt(value) } });
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
      <input type="radio" onClick={this.onChangeLevel} value={value} id={`radio${value}`} checked={value === level} />
      <label htmlFor={`radio${value}`}>{Resources[value]}</label>
    </div>
  );

  renderAddedLanguages = () => {
    const { addedLanguages } = this.props;
    return (
      <div key="addedLanguages" className="added-items">
        {addedLanguages.map(({ description, level }, index) =>
          (<div className="added-item" key={index}>
            {Resources.languageName} :
            <span>{description}</span>
            <br />
            {Resources.levelTitle} :
            <span>{Resources[level]}</span>
            <button onClick={() => this.props.removeLanguage({ description, level })} className="btn btn-primary full-width">{Resources.remove}</button>
          </div>))}
      </div>
    );
  }

  render() {
    const { isLoadingLanguages, proposedLanguages } = this.props;
    const { language } = this.state;
    const { description, level } = language;

    return !isLoadingLanguages && [
      <div key="language">
        <ValidatedInput errorMessage={this.getErrorMessage('languageName')}>
          <BasicAutocomplete
            value={description}
            onChange={this.onChangeName}
            placeholder={Resources.languageName}
            items={proposedLanguages}
          />
        </ValidatedInput>
        <ValidatedInput errorMessage={this.getErrorMessage('languageLevel')}>
          <div className="level-scale" key="scale">
            <p>{Resources.languageLevel}</p>
            {this.renderLevelScale(5, level)}
          </div>
        </ValidatedInput>
        <button onClick={this.addItem} className="btn btn-secondary full-width">{Resources.submit}</button>
      </div>,
      this.renderAddedLanguages()
    ];
  }
}

Languages.propTypes = {
  getLanguages: PropTypes.func.isRequired,
  isLoadingLanguages: PropTypes.bool.isRequired,
  proposedLanguages: PropTypes.array,
  addedLanguages: PropTypes.array,
  addLanguage: PropTypes.func.isRequired,
  removeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = ({ languages: { isLoadingLanguages, proposedLanguages } }) => ({
  isLoadingLanguages,
  proposedLanguages: map(proposedLanguages, ps => ps.description)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLanguages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
