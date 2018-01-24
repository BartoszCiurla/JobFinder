import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import Routes from '../../constants/routes';
import Resources from './resources';
import { removeCookie, getUserType } from '../../utils/auth';

class GlobalHeader extends Component {
  renderNavLink = (path, description) => (
    <NavLink className="btn ghost transparent" to={path} key={description}>{description}</NavLink>
  )

  renderAccountLinks = () => {
    const userType = getUserType(this.props.cookies);

    return userType ?
      [
        this.renderNavLink(Routes[userType.toLowerCase()], Resources.dashboard),
        <a className="btn ghost transparent" key="LogOut" onClick={this.logout} >{Resources.logout}</a>,
      ]
      : [
        this.renderNavLink(Routes.signup, Resources.signup),
        this.renderNavLink(Routes.login, Resources.login)
      ];
  }

  logout = () => {
    removeCookie(this.props.cookies);
    this.props.history.push(Routes.homePage);
  }

  render() {
    return (
      <div className="header">
        <NavLink className="btn ghost transparent" to={Routes.homePage}>{Resources.home}</NavLink>
        <div className="header-center">
          In develop
        </div>
        {this.renderAccountLinks()}
      </div>
    );
  }
}


GlobalHeader.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
};

export default withCookies(withRouter(GlobalHeader));
