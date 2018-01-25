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
  removeEducation,
  createCV
} from '../../actions/cVBuilder';
import { getSkillLevels } from '../../actions/common';
import Resources from './resources';
import { validate as validateSkill } from '../../utils/validators/skill';
import { validate as validateExperience } from '../../utils/validators/workExperience';
import { validate as validateCertification } from '../../utils/validators/certification';
import { validate as validateEducation} from '../../utils/validators/education';
import { validate as validateCV} from '../../utils/validators/cv';

class CVBuilder extends Component {
  state = {
    errors: [],
  }

  componentWillMount = () => (_.isEmpty(this.props.skillLevels) && this.props.getSkillLevels())

  getErrorMessage = (name) => ((_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message)

  setRegularField = ({ target: { name, value } }) => (this.props.setRegularField({ name, value }))

  tryAddData = (data, validateMethod, validateParameters, callBackAction) => {
    const validationResult = validateMethod(validateParameters);

    validationResult.isValid() && callBackAction(data);

    return validationResult;
  }

  submitForm = () => {
    const validationResult = validateCV(this.props);

    this.setState({ errors: validationResult.errors });

    validationResult.isValid() && this.props.createCV(this.props);

    //todo reset redux if ok
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
      <div>
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
          addExperience={exp => this.tryAddData(
            exp,
            validateExperience,
            exp,
            this.props.addExperience
          )}
          removeExperience={this.props.removeExperience}
        />
        <Skills
           title={Resources.skillTitle}
           tips={Resources.skillTips}
           skills={skills}
           addSkill={({skill, skillLevel}) => this.tryAddData(
             {skill, skillLevel},
             validateSkill,
             {skill, skillLevel, skills},
             this.props.addSkill
          )}
           removeSkill={this.props.removeSkill}
           skillLevels={skillLevels}
        />
        <Certifications
          certifications={certifications}
          addCertification={(certification) => this.tryAddData(
            certification,
            validateCertification,
            {certification, certifications},
            this.props.addCertification
          )}
          removeCertification={this.props.removeCertification}
        />
        <Educations
          educations={educations}
          addEducation={(education) => this.tryAddData(
            education,
            validateEducation,
            education,
            this.props.addEducation
          )}
          removeEducation={this.props.removeEducation}
        />
        <Contact
          email={email}
          phoneNumber={phoneNumber}
          getErrorMessage={this.getErrorMessage}
          setRegularField={this.setRegularField}
        />
        <button onClick={this.submitForm}>{Resources.send}</button>
      </div>
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
  removeEducation,
  createCV
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
  createCV: PropTypes.func.isRequired,
  getSkillLevels: PropTypes.func.isRequired,
  skillLevels: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CVBuilder);

