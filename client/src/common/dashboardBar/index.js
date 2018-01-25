import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const DashboardBar = (props) => {
  return (
    <div className="dashboard-bar">
      <h2 className="title" >{props.title}</h2>
      <div className="btn-green">
        <span>
          <NavLink to={props.navigateTo}>{props.linkTitle}</NavLink>
        </span>
      </div>

    </div>
  );
};

DashboardBar.propTypes = {
  navigateTo: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DashboardBar;
