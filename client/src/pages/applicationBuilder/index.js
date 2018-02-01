import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

import { getUserCredentials } from '../../utils/auth';
import Resources from './resources';
import { validate as validateProfession } from '../../utils/validators/profession';
import Profession from '../../common/profession';
import Skills from '../../common/skills';
import Languages from '../../common/languages';
import Certificates from '../../common/certificates';
import StepWizard from '../../common/stepWizard';
import Routes from '../../constants/routes';
import {
  setApplicationCategory,
  setApplicationProfession,
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
          onChangeCategory={this.props.setApplicationCategory}
          onChangeProfession={this.props.setApplicationProfession}
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

  render() {
    const steps = [
      this.professionStep(),
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
  setApplicationCategory: PropTypes.func.isRequired,
  setApplicationProfession: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
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

const mapStateToProps = ({ applicationBuilder: { category, profession, skills, languages, certificates } }) => ({
  category,
  profession,
  skills,
  languages,
  certificates
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setApplicationCategory,
  setApplicationProfession,
  setApplicationSkill,
  removeApplicationSkill,
  setApplicationLanguage,
  removeApplicationLanguage,
  setApplicationCertificate,
  removeApplicationCertificate,
  createApplication
}, dispatch);

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBuilder)));
