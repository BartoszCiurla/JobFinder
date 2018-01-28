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
  tryCreateApplication = () => {
    this.props.createApplication(getUserCredentials(this.props.cookies))
      .then(this.props.history.push(Routes.employee));
  }
  render() {
    const {
      category,
      profession
    } = this.props;

    return (
      <div className="application-builder">
        <div className="form">
          <h2 className="title">{Resources.title}</h2>
          <Profession
            category={category}
            profession={profession}
            onChangeCategory={this.props.setApplicationCategory}
            onChangeProfession={this.props.setApplicationProfession}
          />
          <button onClick={this.tryCreateApplication} className="btn btn-primary full-width">{Resources.submit}</button>
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
