import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { setActiveUser, removeActiveUser} from '../actions/account';

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
      <button key="LogOut" onClick={() => this.props.removeActiveUser()}>Log Out</button>,
      <div key="UserEmail">{activeUser.email}</div>
    ]
    :[
      this.renderNavLink("/signup", "Signup"),
      this.renderNavLink("/login", "Login"),
    ];
  }

  renderUserOptionsLinks = () => {
    const {activeUser} = this.props;

    if(!activeUser){
      return null;
    }

    if(activeUser.userType === 'Employer'){
      return [
        this.renderNavLink("/jobOffer","Create job offer")
      ];
    }

    return null;
  }

  render() {
    const activeStyle = { color: 'blue' };

    return (
      <div>
         <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
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
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader)));
