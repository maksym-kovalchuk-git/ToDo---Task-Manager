import { useTranslation } from 'react-i18next';

import './TaskDragPreview.scss';

/**
 * Візуальний preview картки під час DnD (рендериться всередині DragOverlay).
 * Кнопки некліковані — лише для зовнішнього вигляду.
 *
 * @param {{ task: import('../types').Task }} props
 */
function TaskDragPreview({ task }) {
  const { t } = useTranslation();

  return (
    <div className='task-card drag-window'>
      {task.priority && <span className='task-priority-tag'>{t('important')}</span>}
      <h4 className='task-title'>{task.title}</h4>
      <p className='task-description'>{task.description}</p>
      <div className='task-meta'>
        <span>{t('added')}: {task.date}</span>
        {task.deadline && (
          <span className='deadline'>
            {t('deadline')}: {new Date(task.deadline).toLocaleDateString('uk-UA')}
          </span>
        )}
      </div>
      <div className='task-actions'>
        <button className='btn' tabIndex={-1}>{t('edit')}</button>
        <button className='btn btn-danger' tabIndex={-1}>{t('delete')}</button>
      </div>
    </div>
  );
}

export default TaskDragPreview;
