import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );

  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={userLogin?.avatar} alt={userLogin?.avatar} />
        </div>
        <div className="account-info">
          <p>Jira Clone</p>
          <p>
            Welcome !<span> {userLogin?.name}</span>
          </p>
        </div>
      </div>
      <div className="control">
        <div className="Navigation">
          <i className="fa fa-credit-card" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: 'blue' }}
            to="/cyberbugs"
            activeClassName="active font-weight-bold text-primary"
          >
            Cyber Board
          </NavLink>
        </div>
        <div className="Navigation">
          <i className="fa fa-cog " />
          <NavLink
            className="text-dark"
            activeStyle={{ color: 'blue' }}
            to="/projectmanagement"
            activeClassName="active font-weight-bold  text-primary"
          >
            Project Management
          </NavLink>
        </div>
        <div className="Navigation">
          <i className="fas fa-folder-plus" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: 'blue' }}
            to="/createproject"
            activeClassName="active font-weight-bold  text-primary"
          >
            Create Project
          </NavLink>
        </div>
        <div className="Navigation">
          <i className="fas fa-users-cog" />
          <NavLink
            className="text-dark"
            activeStyle={{ color: "blue" }}
            to="/usermanagement"
            activeClassName="active font-weight-bold  text-primary"
          >
            User Management
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and Filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
