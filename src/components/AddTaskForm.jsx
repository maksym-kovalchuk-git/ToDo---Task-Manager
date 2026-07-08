import { useState } from 'react';
import './AddTaskForm.scss';

/**
 * @param {{
 *   onAdd: (task: import('../types').Task) => void,
 *   onCancel: () => void,
 * }} props
 */
function AddTaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: '',
      date: new Date().toLocaleDateString('uk-UA'),
      priority: false,
      deadline: '',
    });
    setTitle('');
  }

  return (
    <form className='add-task-form' onSubmit={handleSubmit}>
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Введіть назву завдання'
        maxLength={50}
      />
      <div className='btn-add-task'>
        <button className='btn btn-primary' type='submit'>Додати завдання</button>
        <button className='btn' type='button' onClick={onCancel}>Скасувати</button>
      </div>
    </form>
  );
}

export default AddTaskForm;
