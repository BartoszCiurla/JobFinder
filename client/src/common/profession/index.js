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
      onChangeCategory,
      onChangeProfession,
      category,
      profession,
      isLoadingProfessions
     } = this.props;

    return !isLoadingProfessions && [
      <ValidatedInput key="category" errorMessage="">
        <BasicAutocomplete
          value={category}
          onChange={onChangeCategory}
          items={this.getCategoryNames()}
          placeholder={Resources.categoryPlaceholder}
        />
      </ValidatedInput>,
      category && <ValidatedInput key="profession" errorMessage="">
        <BasicAutocomplete
          value={profession}
          onChange={onChangeProfession}
          items={this.getProfessionsForCategory(category)}
          placeholder={Resources.categoryPlaceholder}
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
  onChangeCategory: PropTypes.func.isRequired,
  onChangeProfession: PropTypes.func.isRequired,
  getProfessions: PropTypes.func.isRequired,
  professionCategories: PropTypes.array,
  isLoadingProfessions: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profession);