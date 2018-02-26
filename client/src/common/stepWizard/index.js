import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

import Resources from './resources';

class StepWizard extends Component {
  state = {
    currentStep: 0
  };

  back = () => (this.setState({ currentStep: this.state.currentStep - 1 }))

  next = (currentStep) => {
    this.props.steps[currentStep].validate() &&
      this.setState({ currentStep: this.state.currentStep + 1 });
  }

  onSubmit = () => {
    this.props.steps[this.state.currentStep].validate() && this.props.onSubmit();
  }

  renderLeftButton = (onClick, title) => (
    <div key="leftButton" className="leftButton">
      <button
        onClick={onClick}
        className="btn nav nav_left">
        <span><FaAngleLeft size={35} /></span>
        <span>{title}</span>
      </button>
    </div>
  )

  renderRightButton = (onClick, title) => (
    <div key="rightButton" className="rightButton">
      <button
        onClick={onClick}
        className="btn nav nav_right">
        <span>{title}</span>
        <span><FaAngleRight size={35} /></span>
      </button>
    </div>
  )


  renderContent = (currentStep) => {
    const stepsLength = this.props.steps.length - 1;

    return [
      currentStep === 0 ? this.renderLeftButton(this.props.onCancel, Resources.dashboard)
        : this.renderLeftButton(this.back, Resources.back),
      currentStep !== stepsLength ? this.renderRightButton(() => this.next(currentStep), Resources.next)
        : this.renderRightButton(this.onSubmit, Resources.submit)
    ];
  }

  renderStep = (currentStep) => (
    <div key="step" className="step">
      <div className="form">
        {this.props.steps[currentStep].renderStep}
      </div>
    </div>
  )

  renderProgressBar = (currentStep) => (
    <div className="progressBar">
      {this.props.steps.map((step, index) =>
        <span key={index} className={index === currentStep ? "item active" : "item"}>{step.title}</span>
      )}
    </div>
  );

  render() {
    const { currentStep } = this.state;

    return (
      <div className="stepWizard">
        <h1 className="title">{this.props.title}</h1>
        {this.renderProgressBar(currentStep)}
        <div className="content">
          {this.renderContent(currentStep)}
          {this.renderStep(currentStep)}
        </div>
      </div>
    );
  }
}

StepWizard.propTypes = {
  steps: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default StepWizard;
