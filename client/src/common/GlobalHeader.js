import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { setActiveUser, removeActiveUser} from '../actions/account';
import Routes from '../constants/routes';
import Resources from './resource';

export class GlobalHeader extends Component {
  componentWillMount() {
    const { cookies } = this.props;

    const activeUser = cookies.get('activeUser') || null;
    activeUser && this.props.setActiveUser(activeUser);
  }

  renderNavLink = (path, description) => {
    const activeStyle = { color: 'blue' };

    return <NavLink key={description} to={path} activeStyle={activeStyle}>{description}</NavLink>;
  }

  renderAccountLinks = () => {
    const {activeUser} = this.props;

    return activeUser ?
    [
      <button key="LogOut" onClick={this.logout}>{Resources.logout}</button>,
      <div key="UserEmail">{activeUser.email}</div>
    ]
    :[
      this.renderNavLink(Routes.signup, Resources.signup),
      this.renderNavLink(Routes.login, Resources.login),
    ];
  }

  logout = () => {
    this.props.history.push(Routes.homePage);
    this.props.removeActiveUser();
  }

  renderUserOptionsLinks = () => {
    const {activeUser} = this.props;

    if(!activeUser){
      return null;
    }

    if(activeUser.userType === 'Employer'){
      return [
        this.renderNavLink(Routes.jobOfferBuilder, Resources.jobOfferBuilder)
      ];
    }

    if(activeUser.userType === 'Employee'){
      return [
        this.renderNavLink(Routes.curriculumVitaeBuilder, Resources.curriculumVitaeBuilder)
      ];
    }

    return null;
  }

  render() {
    const activeStyle = { color: 'blue' };

    return (
      <div>
         <NavLink exact to={Routes.homePage} activeStyle={activeStyle}>{Resources.home}</NavLink>
         {this.renderAccountLinks()}
         {this.renderUserOptionsLinks()}
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
