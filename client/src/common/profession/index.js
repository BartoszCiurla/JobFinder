import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProfessions } from '../../actions/profession';
import Resources from './resources';

import ValidatedInput from '../ValidatedInput';
import BasicAutocomplete from '../basicAutocomplete';

class Profession extends Component {
  componentWillMount() {
    _.isEmpty(this.props.professionCategories) &&
      this.props.getProfessions();
  }

  getErrorMessage = (name) => (
    (_.find(this.props.errors, e => e.attribute === name) || { message: '' }).message
  )

  getCategoryNames = () => (_.map(this.props.professionCategories, pc => pc.name))

  getProfessionsForCategory = (category) => {
    if (!category) {
      return [];
    }

    const professionsForCategory = _.find(this.props.professionCategories, pc => pc.name === category);

    return _.isEmpty(professionsForCategory) ?
      []
      : professionsForCategory.professionNames.map(pn => pn.name);
  }

  render() {
    const {
      onChange,
      category,
      profession,
      isLoadingProfessions
    } = this.props;

    return !isLoadingProfessions && [
      <ValidatedInput key="category" errorMessage={this.getErrorMessage("category")}>
        <BasicAutocomplete
          value={category}
          onChange={(value) => onChange({ name: 'category', value })}
          items={this.getCategoryNames()}
          placeholder={Resources.categoryPlaceholder}
        />
      </ValidatedInput>,
      category && <ValidatedInput key="profession" errorMessage={this.getErrorMessage("profession")}>
        <BasicAutocomplete
          value={profession}
          onChange={(value) => onChange({ name: 'profession', value })}
          items={this.getProfessionsForCategory(category)}
          placeholder={Resources.professionPlaceholder}
        />
      </ValidatedInput>
    ];
  }
}

const mapStateToProps = ({ professions }) => ({
  professionCategories: professions.categories.map(c => c),
  isLoadingProfessions: professions.isLoadingProfessions,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  getProfessions
}, dispatch);

Profession.propTypes = {
  onChange: PropTypes.func.isRequired,
  getProfessions: PropTypes.func.isRequired,
  professionCategories: PropTypes.array,
  isLoadingProfessions: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  errors: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profession);
