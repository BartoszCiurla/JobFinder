import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

import { getUserCredentials } from '../../utils/auth';
import Resources from './resources';
import Profession from '../../common/profession';
import Routes from '../../constants/routes';
import { setApplicationCategory, setApplicationProfession, createApplication } from '../../actions/applicationBuilder';

class ApplicationBuilder extends Component {
  state = {
    currentStep: 1,
    stepsTitle: [
      Resources.step1,
      Resources.step2,
      Resources.step3,
      Resources.step4,
      Resources.step5
    ],
  }

  renderStep1 = () => {
    const {
      category,
      profession
    } = this.props;

    return (
      <Profession
        category={category}
        profession={profession}
        onChangeCategory={this.props.setApplicationCategory}
        onChangeProfession={this.props.setApplicationProfession}
      />);
  }

  back = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  next = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  tryCreateApplication = () => {
    this.props.createApplication(getUserCredentials(this.props.cookies))
      .then(this.props.history.push(Routes.employee));
  }

  renderNavigationBar = (currentStep) => {
    return [
      currentStep === 1 && <button className="btn btn_left" key="dashboard">Panel</button>,
      currentStep !== 1 && <button onClick={this.back} className="btn btn_left" key="back">Wstecz</button>,
      currentStep !== 5 && <button onClick={this.next} className="btn btn_right" key="next">Dalej</button>,
      currentStep === 5 && <button className="btn btn_right" key="submit" onClick={this.tryCreateApplication}>Zapisz</button>
    ];
  }

  renderProgressBar = (currentStep) => {
    const { stepsTitle } = this.state;

    return (
      <div className="progressBar">
        {stepsTitle.map((st, index) => <span key={index + 1} className={index + 1 === currentStep ? "item active" : "item"}>{st}</span>)}
      </div>
    );
  }

  render() {
    const { currentStep } = this.state;

    const steps = {
      1: this.renderStep1(),
      2: "step2",
      3: "step3",
      4: "step4",
      5: "step5"
    };

    return (
      <div className="stepWizard">
        <h1 className="title">{Resources.title}</h1>
        {this.renderProgressBar(currentStep)}
        {this.renderNavigationBar(currentStep)}
        <div className="step">
          <div className="form">
            {steps[currentStep]}
          </div>
        </div>
      </div>
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
