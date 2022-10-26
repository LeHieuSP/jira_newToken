/* eslint-disable max-len */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Classes from './KanbanBoard.module.scss';
import IssuesContainer from './IssuesContainer/IssuesContainer';

function KanbanBoard() {
  const data = useSelector((state) => state.project.data);

  const { alias, members, lstTask } = data;

  return (
    <div className={Classes.KanbanBoard}>
      <div>{`Projects / ${alias} / Kanban Board`}</div>
      <div className={Classes.Header}>Kanban Board</div>
      <div className={Classes.IssueActions}>
        <FontAwesomeIcon icon={faSearch} className={Classes.SearchIcon} />
        <input />
        <div className={Classes.Members}>
          {members.map((member) => <img src={member.avatar} alt={member.name} className={Classes.Avatar} key={member.name} />)}
        </div>
        <div className={Classes.Action}>Only My Issues</div>
        <div className={Classes.Action}>Recently Updated</div>
      </div>
      <div className={Classes.Issues}>
        <IssuesContainer title="backlog" issues={lstTask.filter((task) => task.statusName === 'BACKLOG')} />
        <IssuesContainer title="selected for development" issues={lstTask.filter((task) => task.statusName === 'SELECTED FOR DEVELOPMENT')} />
        <IssuesContainer title="in progress" issues={lstTask.filter((task) => task.statusName === 'IN PROGRESS')} />
        <IssuesContainer title="done" issues={lstTask.filter((task) => task.statusName === 'DONE')} />
      </div>
    </div>
  );
}

export default KanbanBoard;
