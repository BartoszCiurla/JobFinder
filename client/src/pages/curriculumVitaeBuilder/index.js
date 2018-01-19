import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import PersonInformation from './components/PersonInformation';
import WorkExperience from './components/WorkExperience';
import Contact from './components/Contact';
import Skill from './components/Skill';

import {setRegularField} from '../../actions/curriculumVitaeBuilder';

class CurriculumVitaeBuilder extends Component {
  state = {
    errors: [],
  }

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  setRegularField = ({ target: { name, value } }) => {
    this.props.setRegularField({name,value});
  }

  render() {
    const {name, roleTitle, aboutYou, email, phoneNumber} = this.props;

    return (
      <div>
        <PersonInformation
          name={name}
          roleTitle={roleTitle}
          aboutYou={aboutYou}
          getErrorMessage={this.getErrorMessage}
          setRegularField={this.setRegularField}
        />
        <Contact
          email={email}
          phoneNumber={phoneNumber}
          getErrorMessage={this.getErrorMessage}
          setRegularField={this.setRegularField}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ curriculumVitaeBuilder }) => ({
  ...curriculumVitaeBuilder
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setRegularField
}, dispatch);

CurriculumVitaeBuilder.propTypes = {
  name: PropTypes.string,
  roleTitle: PropTypes.string,
  aboutYou: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  setRegularField: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumVitaeBuilder);
