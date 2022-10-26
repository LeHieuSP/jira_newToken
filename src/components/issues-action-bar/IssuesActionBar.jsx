import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faJira } from '@fortawesome/free-brands-svg-icons';
import Classes from './IssuesActionBar.module.scss';

function IssuesActionBar() {
  return (
    <aside className={Classes.IssuesActionBar}>
      <FontAwesomeIcon icon={faJira} className={Classes.JiraIcon} />
      <div className={Classes.ActionWrapper}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={Classes.ActionIcon} />
        <p className={Classes.ActionText}>Search&nbsp;Issues</p>
      </div>
      <div className={Classes.ActionWrapper}>
        <FontAwesomeIcon icon={faPlus} className={Classes.ActionIcon} />
        <p className={Classes.ActionText}>Create&nbsp;Issues</p>
      </div>
      <div className={`${Classes.ActionWrapper} ${Classes.About}`}>
        <FontAwesomeIcon icon={faCircleQuestion} className={Classes.ActionIcon} />
        <p className={Classes.ActionText}>About</p>
      </div>
    </aside>
  );
}

export default IssuesActionBar;
