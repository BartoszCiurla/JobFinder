import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import Profession from '../../common/profession';
import StepWizard from '../../common/stepWizard';
import Salary from '../../common/salary';
import Skills from '../../common/skills';
import Languages from '../../common/languages';
import Additional from './components/Additional';

import Routes from '../../constants/routes';
import Resources from './resources';
import { validate as validateProfession } from '../../utils/validators/profession';
import { validate as validateSkill } from '../../utils/validators/skill';
import { validate as validateSalary } from '../../utils/validators/salary';
import { getUserCredentials } from '../../utils/auth';
import {
  setOfferRequiredSkill,
  removeOfferRequiredSkill,
  setOfferWelcomeSkill,
  removeOfferWelcomeSkill,
  setOfferLanguage,
  removeOfferLanguage,
  setOfferRegularField,
  createOffer
} from '../../actions/offerBuilder';

class OfferBuilder extends Component {
  state = {
    errors: []
  }

  tryCreateOffer = () => {
    this.props.createOffer(getUserCredentials(this.props.cookies))
      .then(this.props.history.push(Routes.employer));
  }

  welcomeSkillValidator = (skill, addedSkills) => {
    const { requiredSkills } = this.props;

    return validateSkill(skill, _.concat(addedSkills, requiredSkills));
  }

  professionStep = () => {
    const {
      category,
      profession
    } = this.props;

    return {
      renderStep:
        <Profession
          category={category}
          profession={profession}
          onChange={this.props.setOfferRegularField}
          errors={this.state.errors}
        />,
      title: `${Resources.profession}`,
      validate: () => {
        const validateResult = validateProfession(category, profession);
        this.setState({ errors: validateResult.errors });
        return validateResult.isValid();
      }
    };
  }

  requiredSkillsStep = () => {
    const {
      requiredSkills,
      category,
      profession
    } = this.props;

    return {
      renderStep:
        <Skills
          addSkill={this.props.setOfferRequiredSkill}
          removeSkill={this.props.removeOfferRequiredSkill}
          addedSkills={requiredSkills}
          category={category}
          profession={profession}
        />,
      title: `${Resources.requiredSkills}`,
      validate: () => true
    };
  }

  welcomeSkillsStep = () => {
    const {
      welcomeSkills,
      category,
      profession
    } = this.props;

    return {
      renderStep:
        <Skills
          addSkill={this.props.setOfferWelcomeSkill}
          removeSkill={this.props.removeOfferWelcomeSkill}
          addedSkills={welcomeSkills}
          customValidation={this.welcomeSkillValidator}
          category={category}
          profession={profession}
        />,
      title: `${Resources.welcomeSkills}`,
      validate: () => true
    };
  }

  languagesStep = () => {
    const {
      languages
    } = this.props;

    return {
      renderStep:
        <Languages
          addedLanguages={languages}
          addLanguage={this.props.setOfferLanguage}
          removeLanguage={this.props.removeOfferLanguage}
        />,
      title: `${Resources.languages}`,
      validate: () => true
    };
  }

  additional = () => {
    const { certificatesWillBeAnAdvantage } = this.props;
    return {
      renderStep:
        <Additional
          certificatesWillBeAnAdvantage={certificatesWillBeAnAdvantage}
          setRegularField={this.props.setOfferRegularField}
        />,
      title: `${Resources.additional}`,
      validate: () => true
    };
  }

  salaryStep = () => {
    const {
      salary
    } = this.props;

    return {
      renderStep:
        <Salary
          onChange={this.props.setOfferRegularField}
          salary={salary}
          errors={this.state.errors}
        />,
      title: `${Resources.salary}`,
      validate: () => {
        const validateResult = validateSalary(salary);
        this.setState({ errors: validateResult.errors });
        return validateResult.isValid();
      }
    };
  }

  render() {
    const steps = [
      this.professionStep(),
      this.salaryStep(),
      this.requiredSkillsStep(),
      this.welcomeSkillsStep(),
      this.languagesStep(),
      this.additional()
    ];

    return (
      <StepWizard
        steps={steps}
        title={Resources.title}
        onSubmit={this.tryCreateOffer}
        onCancel={() => this.props.history.push(Routes.employer)}
      />
    );
  }
}

OfferBuilder.propTypes = {
  setOfferRequiredSkill: PropTypes.func.isRequired,
  removeOfferRequiredSkill: PropTypes.func.isRequired,
  setOfferWelcomeSkill: PropTypes.func.isRequired,
  removeOfferWelcomeSkill: PropTypes.func.isRequired,
  setOfferLanguage: PropTypes.func.isRequired,
  removeOfferLanguage: PropTypes.func.isRequired,
  setOfferRegularField: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  certificatesWillBeAnAdvantage: PropTypes.bool.isRequired,
  requiredSkills: PropTypes.array,
  welcomeSkills: PropTypes.array,
  languages: PropTypes.array,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
  createOffer: PropTypes.func.isRequired
};

const mapStateToProps = ({ offerBuilder: { category, profession, salary, requiredSkills, welcomeSkills, languages, certificatesWillBeAnAdvantage } }) => ({
  category,
  profession,
  certificatesWillBeAnAdvantage,
  requiredSkills,
  welcomeSkills,
  salary,
  languages
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setOfferRequiredSkill,
  removeOfferRequiredSkill,
  setOfferWelcomeSkill,
  removeOfferWelcomeSkill,
  setOfferLanguage,
  removeOfferLanguage,
  setOfferRegularField,
  createOffer
}, dispatch);

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBuilder)));

