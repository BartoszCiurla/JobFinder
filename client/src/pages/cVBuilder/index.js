import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import PersonInformation from './components/PersonInformation';
import WorkExperience from './components/workExperience';
import Contact from './components/Contact';
import Skills from '../../common/skill';
import Certifications from './components/certification';
import Educations from './components/education';
import {
  setRegularField,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  addCertification,
  removeCertification,
  addEducation,
  removeEducation
} from '../../actions/cVBuilder';
import { getSkillLevels } from '../../actions/common';
import Resources from './resources';
import { validate as validateSkill } from '../../utils/validators/skill';
import { validate as validateExperience } from '../../utils/validators/workExperience';
import { validate as validateCertification } from '../../utils/validators/certification';
import { validate as validateEducation} from '../../utils/validators/education';

class CVBuilder extends Component {
  state = {
    errors: [],
  }

  componentWillMount() {
    _.isEmpty(this.props.skillLevels) && this.props.getSkillLevels();
  }

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  setRegularField = ({ target: { name, value } }) => {
    this.props.setRegularField({ name, value });
  }

  tryAddSkill = ({ skill, skillLevel }) => {
    const validationResult = validateSkill(skill, skillLevel, this.props.skills);

    validationResult.isValid() && this.props.addSkill({skill, skillLevel});

    return validationResult;
  }

  tryAddExperience = (experience) => {
    const validationResult = validateExperience(experience);

    validationResult.isValid() && this.props.addExperience(experience);

    return validationResult;
  }

  tryAddCertification = (certification) => {
    const validationResult = validateCertification(certification, this.props.certifications);

    validationResult.isValid() && this.props.addCertification(certification);

    return validationResult;
  }

  tryAddEducation = (education) => {
    const validationResult = validateEducation(education, this.props.educations);

    validationResult.isValid() && this.props.addEducation(education);

    return validationResult;
  }

  render() {
    const {
      name,
      roleTitle,
      aboutYou,
      email,
      phoneNumber,
      skills,
      skillLevels,
      workExperience,
      certifications,
      educations
    } = this.props;

    return (
      <form>
        <PersonInformation
          name={name}
          roleTitle={roleTitle}
          aboutYou={aboutYou}
          getErrorMessage={this.getErrorMessage}
          setRegularField={this.setRegularField}
        />
        <WorkExperience
          title={Resources.workExperienceTitle}
          tips={Resources.workExperienceTips}
          workExperience={workExperience}
          addExperience={this.tryAddExperience}
          removeExperience={this.props.removeExperience}
        />
        <Skills
           title={Resources.skillTitle}
           tips={Resources.skillTips}
           skills={skills}
           addSkill={this.tryAddSkill}
           removeSkill={this.props.removeSkill}
           skillLevels={skillLevels}
        />
        <Certifications
          certifications={certifications}
          addCertification={this.tryAddCertification}
          removeCertification={this.props.removeCertification}
        />
        <Educations
          educations={educations}
          addEducation={this.tryAddEducation}
          removeEducation={this.props.removeEducation}
        />
        <Contact
          email={email}
          phoneNumber={phoneNumber}
          getErrorMessage={this.getErrorMessage}
          setRegularField={this.setRegularField}
        />
      </form>
    );
  }
}

const mapStateToProps = ({ cVBuilder, common }) => ({
  ...cVBuilder,
  skillLevels: common.skillLevels
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setRegularField,
  getSkillLevels,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  addCertification,
  removeCertification,
  addEducation,
  removeEducation
}, dispatch);

CVBuilder.propTypes = {
  name: PropTypes.string,
  roleTitle: PropTypes.string,
  aboutYou: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  skills: PropTypes.array.isRequired,
  workExperience: PropTypes.array.isRequired,
  certifications: PropTypes.array.isRequired,
  educations: PropTypes.array.isRequired,
  setRegularField: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired,
  removeExperience: PropTypes.func.isRequired,
  addCertification: PropTypes.func.isRequired,
  removeCertification: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  removeEducation: PropTypes.func.isRequired,
  getSkillLevels: PropTypes.func.isRequired,
  skillLevels: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CVBuilder);

