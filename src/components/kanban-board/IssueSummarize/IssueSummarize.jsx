import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Classes from './IssueSummarize.module.scss';

function IssueSummarize(props) {
  const {
    details,
  } = props;

  return (
    details.map((detail) => (
      <div className={Classes.IssueSummarize} key={detail.taskId}>
        <div className={Classes.Description}>{detail.description.slice(detail.description.indexOf('>') + 1, detail.description.indexOf('.'))}</div>
        <div className={Classes.Status}>
          <div className={Classes.IssueType}>
            {detail.alias.toLowerCase() === 'task' && <FontAwesomeIcon icon={faSquareCheck} /> }
            {detail.alias.toLowerCase() === 'story' && <FontAwesomeIcon icon={faBookmark} /> }
            {detail.alias.toLowerCase() === 'bug' && <FontAwesomeIcon icon={faCircleExclamation} /> }
          </div>
          {detail.priorityTask.priority === 'High' && <FontAwesomeIcon icon={faArrowUp} />}
          {detail.priorityTask.priority === 'Medium' && <FontAwesomeIcon icon={faArrowDown} />}
          <div className={Classes.Assignee}>
            {detail.assigness.map((assignee) => (
              <img
                key={assignee.id}
                className={Classes.Avatar}
                src={assignee.avatar}
                alt={assignee.name}
              />
            ))}
          </div>
        </div>
      </div>
    ))

  );
}

export default IssueSummarize;
