import React from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';

import { NavLink } from 'react-router-dom';

const DashboardBar = (props) => {
  return (
    <div className="dashboard-bar">
      <div onClick={props.onClickLeftButton} className="btn-left">
        {props.showLeftButton &&
          <span>
            <FaAngleLeft size={50} />
            <a>{props.leftButtonTitle}</a>
          </span>}
      </div>
      <h2 className="title" >
        {props.title}
      </h2>
      <NavLink className="btn-green" to={props.navigateTo}>
        <span>
          {props.linkTitle}
        </span>
        <FaPlus size={50} />
      </NavLink>
    </div>
  );
};

DashboardBar.defaultProps = {
  showLeftButton: false
};

DashboardBar.propTypes = {
  navigateTo: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showLeftButton: PropTypes.bool,
  onClickLeftButton: PropTypes.func,
  leftButtonTitle: PropTypes.string
};

export default DashboardBar;
