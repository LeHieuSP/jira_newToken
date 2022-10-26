import React from 'react';
import IssueSummarize from '../IssueSummarize/IssueSummarize';
import Classes from './IssuesContainer.module.scss';

function IssuesContainer(props) {
  const { title, issues } = props;

  return (
    <div className={Classes.Container} draggable>
      <div className={Classes.Title}>{title}</div>
      <div>
        {issues.map((issue) => (
          <IssueSummarize details={issue.lstTaskDeTail} key={issue.statusId} />
        ))}
      </div>
    </div>
  );
}

export default IssuesContainer;
