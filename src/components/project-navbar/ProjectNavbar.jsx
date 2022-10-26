import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Classes from './ProjectNavbar.module.scss';
import NavbarIcon from '../../assets/icons/navbar-icon.svg';
import { ReactComponent as BoardIcon } from '../../assets/icons/board-icon.svg';

function ProjectNavbar() {
  const params = useParams();

  const data = useSelector((state) => state.project.data);

  const { alias } = data;

  const { projectID } = params;

  return (
    <div className={Classes.ProjectNavbar}>
      <div className={Classes.NavbarHeader}>
        <img src={NavbarIcon} alt="header-logo" />
        <div>
          <p className={Classes.ProjectName}>{alias}</p>
          <p className={Classes.ProjectType}>Software project</p>
        </div>
      </div>
      <NavLink
        exact
        to={`/project/${projectID}/board`}
        className={Classes.ProjectNav}
        activeClassName={Classes.Active}
      >
        <BoardIcon />
        <p>Kanban Board</p>
      </NavLink>
      <NavLink
        exact
        to={`/project/${projectID}/settings`}
        className={Classes.ProjectNav}
        activeClassName={Classes.Active}
      >
        <FontAwesomeIcon icon={faGear} className={Classes.GearIcon} />
        <p>Project Settings</p>
      </NavLink>
    </div>
  );
}

export default ProjectNavbar;
