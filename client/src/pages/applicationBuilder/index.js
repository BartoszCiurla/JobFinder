import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

import { getUserCredentials } from '../../utils/auth';
import Resources from './resources';
import { validate as validateProfession } from '../../utils/validators/profession';
import { validate as validateSalary } from '../../utils/validators/salary';
import Profession from '../../common/profession';
import Skills from '../../common/skills';
import Languages from '../../common/languages';
import Certificates from '../../common/certificates';
import Salary from '../../common/salary';
import StepWizard from '../../common/stepWizard';

import Routes from '../../constants/routes';
import {
  setApplicationRegularField,
  setApplicationSkill,
  removeApplicationSkill,
  createApplication,
  setApplicationLanguage,
  removeApplicationLanguage,
  setApplicationCertificate,
  removeApplicationCertificate
} from '../../actions/applicationBuilder';

class ApplicationBuilder extends Component {
  state = {
    errors: []
  }
  tryCreateApplication = () => {
    this.props.createApplication(getUserCredentials(this.props.cookies))
      .then(this.props.history.push(Routes.employee));
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
          onChange={this.props.setApplicationRegularField}
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

  skillsStep = () => {
    const {
      skills,
      category,
      profession
    } = this.props;

    return {
      renderStep:
        <Skills
          addSkill={this.props.setApplicationSkill}
          removeSkill={this.props.removeApplicationSkill}
          addedSkills={skills}
          category={category}
          profession={profession}
        />,
      title: `${Resources.skills}`,
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
          addLanguage={this.props.setApplicationLanguage}
          removeLanguage={this.props.removeApplicationLanguage}
        />,
      title: `${Resources.languages}`,
      validate: () => true
    };
  }

  certificatesStep = () => {
    const {
      certificates,
      category
    } = this.props;
    return {
      renderStep:
        <Certificates
          category={category}
          addedCertificates={certificates}
          addCertificate={this.props.setApplicationCertificate}
          removeCertificate={this.props.removeApplicationCertificate}
        />,
      title: `${Resources.certificates}`,
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
          onChange={this.props.setApplicationRegularField}
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
      this.skillsStep(),
      this.languagesStep(),
      this.certificatesStep()
    ];

    return (
      <StepWizard
        steps={steps}
        title={Resources.title}
        onSubmit={this.tryCreateApplication}
        onCancel={() => this.props.history.push(Routes.employee)}
      />
    );
  }
}

ApplicationBuilder.propTypes = {
  setApplicationRegularField: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
  createApplication: PropTypes.func.isRequired,
  setApplicationSkill: PropTypes.func.isRequired,
  removeApplicationSkill: PropTypes.func.isRequired,
  setApplicationLanguage: PropTypes.func.isRequired,
  removeApplicationLanguage: PropTypes.func.isRequired,
  setApplicationCertificate: PropTypes.func.isRequired,
  removeApplicationCertificate: PropTypes.func.isRequired,
  skills: PropTypes.array,
  languages: PropTypes.array,
  certificates: PropTypes.array
};

const mapStateToProps = ({ applicationBuilder: { category, salary, profession, skills, languages, certificates } }) => ({
  category,
  profession,
  skills,
  languages,
  certificates,
  salary
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setApplicationRegularField,
  setApplicationSkill,
  removeApplicationSkill,
  setApplicationLanguage,
  removeApplicationLanguage,
  setApplicationCertificate,
  removeApplicationCertificate,
  createApplication
}, dispatch);

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBuilder)));
