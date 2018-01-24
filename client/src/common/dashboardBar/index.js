import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const DashboardBar = (props) => {
  return ([
    <div key="left" className="aside btn dashboard-bar-left">
      <NavLink  to={props.leftNavigateTo}>{props.leftLinkTitle}</NavLink>
    </div>,
    <div key="center" className="dashboard-bar-center">
      <h2 key="center" className="">{props.title}</h2>
    </div>,
    <NavLink key="right" className="aside btn dashboard-bar-right" to={props.rightNavigateTo}>{props.rightLinkTitle}</NavLink>
  ]);
};

DashboardBar.propTypes = {
  leftNavigateTo: PropTypes.string.isRequired,
  leftLinkTitle: PropTypes.string.isRequired,
  rightNavigateTo: PropTypes.string.isRequired,
  rightLinkTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DashboardBar;
