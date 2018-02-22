import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

import Routes from '../../constants/routes';
import Resources from './resources';
import { removeCookie, getUserType } from '../../utils/auth';

class GlobalHeader extends Component {
  renderNavLink = (path, description, className) => (
    <div className={className}>
      <NavLink className="btn ghost transparent" to={path} key={description}>{description}</NavLink>
    </div>
  )

  renderAccountLinks = (userType) => {
    return userType ?
      <div className="header-right">
        {this.renderNavLink(Routes[userType.toLowerCase()], Resources.dashboard)}
        <a className="btn ghost transparent" key="LogOut" onClick={this.logout} >{Resources.logout}</a>
      </div>
      : <div className="header-right">
        {this.renderNavLink(Routes.signup, Resources.signup)}
        {this.renderNavLink(Routes.login, Resources.login)}
      </div>;
  }

  logout = () => {
    removeCookie(this.props.cookies);
    this.props.history.push(Routes.homePage);
  }

  renderAngleRight = () => (<FaAngleRight size={45} />)

  render() {
    const userType = getUserType(this.props.cookies);

    return (
      <div className="header">
        <NavLink className="header-logo" to={Routes.homePage}>{Resources.logo}</NavLink>
        {!userType || this.props.pathname === Routes.homePage ?
          <div className="header-center" />
          : <div className="header-center ">
            <div>
              <b>1. </b>
              {Resources[userType][0]}
            </div>
            {this.renderAngleRight()}
            <div>
              <b>2. </b>
              {Resources[userType][1]}
            </div>
            {this.renderAngleRight()}
            <div>
              <b>3. </b>
              {Resources[userType][2]}
            </div>
          </div>
        }
        {this.renderAccountLinks(userType)}
      </div>
    );
  }
}

GlobalHeader.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

const mapStateToProps = ({ routing: { location: { pathname } } }) => ({
  pathname
});

export default withCookies(withRouter(connect(mapStateToProps)(GlobalHeader)));
