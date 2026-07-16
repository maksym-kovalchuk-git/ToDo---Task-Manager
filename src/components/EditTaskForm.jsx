import { useState } from 'react';
import DatePickerUk from './DatePicker';

import { useTranslation } from 'react-i18next';

import './EditTaskForm.scss';

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * @param {{
 *   task: import('../types').Task,
 *   columnId: string,
 *   onSave: (task: import('../types').Task) => void,
 *   onCancel: () => void,
 * }} props
 */
function EditTaskForm({ task, columnId, onSave, onCancel }) {
  const { t } = useTranslation();

  const [draft, setDraft] = useState({ ...task });

  return (
    <div className='task-card task-card-editing'>
      <label>{t('taskTitle')}:</label>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        maxLength={50}
      />
      <label>{t('taskDescription')}:</label>
      <textarea
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        maxLength={1000}
      />
      <div className='form-check form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          role='switch'
          id={`prioritySwitch-${columnId}-${task.id}`}
          checked={draft.priority}
          onChange={(e) => setDraft({ ...draft, priority: e.target.checked })}
        />
        <label className='form-check-label' htmlFor={`prioritySwitch-${columnId}-${task.id}`}>
          {t('taskCheckPriority')}
        </label>
      </div>
      <label>
        {t('deadline')}:
        <DatePickerUk
          value={draft.deadline ? new Date(draft.deadline) : null}
          onChange={(date) => setDraft({ ...draft, deadline: date ? toIsoDate(date) : null })}
        />
      </label>
      <div className='form-actions'>
        <button className='btn btn-primary' onClick={() => onSave(draft)}>
          {t('save')}
        </button>
        <button className='btn' onClick={onCancel}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}

export default EditTaskForm;
