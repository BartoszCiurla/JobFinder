import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import Routes from '../../constants/routes';
import Resources from './resources';
import { isAuthenticated, removeCookie } from '../../utils/auth';

class GlobalHeader extends Component {
  renderNavLink = (path, description) => (<NavLink className="btn ghost transparent" key={description} to={path}>{description}</NavLink>)

  renderAccountLinks = () => {
    return isAuthenticated(this.props.cookies) ?
      <a className="btn ghost transparent" key="LogOut" onClick={this.logout} >{Resources.logout}</a>
      : [
        this.renderNavLink(Routes.signup, Resources.signup),
        this.renderNavLink(Routes.login, Resources.login),
      ];
  }

  logout = () => {
    removeCookie(this.props.cookies);
    this.props.history.push(Routes.homePage);
  }

  render() {
    return (
      <div className="header">
        <div className="header-right">
          {this.renderAccountLinks()}
        </div>
      </div>
    );
  }
}


GlobalHeader.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
};

export default withCookies(withRouter(GlobalHeader));
