import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  renderLeftButton = (onClick, title) => (<button key="leftButton" onClick={onClick} className="btn btn_left">{title}</button>)

  renderRightButton = (onClick, title) => (<button key="rightButton" onClick={onClick} className="btn btn_right">{title}</button>)


  renderNavigationBar = (currentStep) => {
    const stepsLength = this.props.steps.length - 1;

    return [
      currentStep === 0 ? this.renderLeftButton(this.props.onCancel, Resources.dashboard)
        : this.renderLeftButton(this.back, Resources.back),
      currentStep !== stepsLength ? this.renderRightButton(() => this.next(currentStep), Resources.next)
        : this.renderRightButton(this.props.onSubmit, Resources.submit)
    ];
  }

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
        {this.renderNavigationBar(currentStep)}
        <div className="step">
          <div className="form">
            {this.props.steps[currentStep].renderStep}
          </div>
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
