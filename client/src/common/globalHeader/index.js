import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { setActiveUser, removeActiveUser } from '../../actions/account';
import Routes from '../../constants/routes';
import Resources from './resources';

export class GlobalHeader extends Component {
  componentWillMount() {
    const { cookies } = this.props;

    const activeUser = cookies.get('activeUser') || null;
    activeUser && this.props.setActiveUser(activeUser);
  }

  renderNavLink = (path, description) => (<NavLink className="btn ghost transparent" key={description} to={path}>{description}</NavLink>)


  renderAccountLinks = () => {
    const { activeUser } = this.props;

    return activeUser ?
      <a className="btn ghost transparent" key="LogOut" onClick={this.logout} >{Resources.logout}</a>
      : [
        this.renderNavLink(Routes.signup, Resources.signup),
        this.renderNavLink(Routes.login, Resources.login),
      ];
  }

  logout = () => {
    this.props.history.push(Routes.homePage);
    this.props.removeActiveUser();
  }

  renderUserOptionsLinks = () => {
    const { activeUser } = this.props;

    if (!activeUser) {
      return null;
    }

    if (activeUser.userType === 'Employer') {
      return [
        this.renderNavLink(Routes.jobOfferBuilder, Resources.jobOfferBuilder)
      ];
    }

    if (activeUser.userType === 'Employee') {
      return [
        this.renderNavLink(Routes.cVBuilder, Resources.cVBuilder)
      ];
    }

    return null;
  }

  render() {
    return (
      <div className="header">
        <div className="header-right">
          {this.renderAccountLinks()}
          {this.renderUserOptionsLinks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  activeUser: account.activeUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeActiveUser,
  setActiveUser
}, dispatch);

GlobalHeader.propTypes = {
  activeUser: PropTypes.object,
  removeActiveUser: PropTypes.func.isRequired,
  setActiveUser: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired
};

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader)));
