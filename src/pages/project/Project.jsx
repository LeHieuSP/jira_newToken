import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Route, useParams, Switch, useRouteMatch,
} from 'react-router-dom';
import { API_KEY } from '../../constants/Constants';
import classes from './Project.module.scss';
import IssuesActionBar from '../../components/issues-action-bar/IssuesActionBar';
import ProjectNavbar from '../../components/project-navbar/ProjectNavbar';
import KanbanBoard from '../../components/kanban-board/KanbanBoard';
import { ProjectActions } from '../../store/project-slice';

function Project() {
  const params = useParams();

  const { url } = useRouteMatch();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const { projectID } = params;

  const fetchProjectDetails = async () => {
    const detailsResponse = await fetch(
      `https://jiranew.cybersoft.edu.vn/api/Project/getProjectDetail?id=${projectID}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
          TokenCybersoft: API_KEY,
        },
      },
    );

    if (!detailsResponse.ok) {
      throw new Error('Fail to fetch data...');
    }

    const detailsData = await detailsResponse.json();

    dispatch(ProjectActions.getProjectDetails(detailsData));
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <div className={classes.Projects}>
      <IssuesActionBar />
      <ProjectNavbar />
      <Switch>
        <Route path={`${url}/board`} exact>
          <KanbanBoard />
        </Route>

        <Route path={`${url}/settings`} exact>
          <p>Settings</p>
        </Route>

      </Switch>

    </div>
  );
}

export default Project;
