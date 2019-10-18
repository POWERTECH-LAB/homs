/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { parseISO, isPast } from 'date-fns';
import DueDate from './shared/due_date';
import CreatedDate from './shared/created_date';

const HBWClaimingShortList = ({ env, tasks, fetched }) => {
  const { translator: t, connection, taskListPath } = env;

  const viewAll = () => { window.location.href = `${connection.options.host}/${taskListPath}`; };
  const goToTask = (entityUrl) => { window.location.href = entityUrl; };

  const renderDate = (created, due) => {
    if (due) {
      return <span className="deadline"><DueDate env={env} dateISO={due} /></span>;
    } else {
      return <span><CreatedDate env={env} dateISO={created} /></span>;
    }
  };

  const rowCN = due => (
    cx({
      row:     true,
      expired: isPast(parseISO(due))
    })
  );

  const renderNoTasks = () => (
      <div className='no-tasks'>
        <span>
          {t('components.claiming.table.empty_tasks')}
        </span>
      </div>
  );


  return (
    <div className="short-list">
      {tasks.map(({
        id, icon, name, due, created, entity_url
      }) => (
        <div onClick={() => goToTask(entity_url)} key={id} className={rowCN(due)}>
          <div className="left">
            <i className={icon} />
            <span className="title">{name}</span>
          </div>
          <div className="right">
            {renderDate(created, due)}
          </div>
        </div>
      ))}
      {fetched && tasks.length === 0 && renderNoTasks()}
      <div className="button">
        <button onClick={viewAll} className='claim-button-primary'>
          {t('components.claiming.short_list.view_all')}
        </button>
      </div>
    </div>
  );
};

HBWClaimingShortList.propTypes = {
  env:     PropTypes.object.isRequired,
  fetched: PropTypes.bool.isRequired,
  tasks:   PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    icon:       PropTypes.string.isRequired,
    entity_url: PropTypes.string.isRequired,
    created:    PropTypes.string.isRequired,
    due:        PropTypes.string,
  })).isRequired,
};

export default HBWClaimingShortList;
