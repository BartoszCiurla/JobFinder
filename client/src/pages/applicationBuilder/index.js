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
import StepWizard from '../../common/stepWizard';
import Routes from '../../constants/routes';
import {
  setApplicationCategory,
  setApplicationProfession,
  createApplication
} from '../../actions/applicationBuilder';

class ApplicationBuilder extends Component {
  state = {
    errors: []
  }
  tryCreateApplication = () => {
    this.props.createApplication(getUserCredentials(this.props.cookies));
    // .then(this.props.history.push(Routes.employee));
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
    return {
      renderStep: <Skills placeholder={Resources.skillDescription} />,
      title: `${Resources.skills}`,
      validate: () => true
    };
  }

  render() {
    const steps = [
      this.professionStep(),
      this.skillsStep()
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
  createApplication: PropTypes.func.isRequired
};

const mapStateToProps = ({ applicationBuilder }) => ({
  category: applicationBuilder.category,
  profession: applicationBuilder.profession
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setApplicationCategory,
  setApplicationProfession,
  createApplication
}, dispatch);

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationBuilder)));
