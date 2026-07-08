import { COLUMN_COLOR_OPTIONS } from '../constants';
import './AddColumnForm.scss';

/**
 * @param {{
 *   title: string,
 *   color: string,
 *   onTitleChange: (t: string) => void,
 *   onColorChange: (c: string) => void,
 *   onSubmit: (e: React.FormEvent) => void,
 *   onCancel: () => void,
 * }} props
 */
function AddColumnForm({ title, color, onTitleChange, onColorChange, onSubmit, onCancel }) {
  return (
    <form
      className='add-column-form'
      onSubmit={onSubmit}
      style={{ '--selected-color': color }}
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder='Назва колонки'
        maxLength={18}
      />
      <div className='color-picker'>
        {COLUMN_COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type='button'
            className={`color-picker-dot ${color === opt.value ? 'color-picker-dot--active' : ''}`}
            style={{ '--dot-color': opt.value }}
            onClick={() => onColorChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={color === opt.value}
          />
        ))}
      </div>
      <div className='add-column-actions'>
        <button className='btn btn-primary' type='submit'>Створити</button>
        <button className='btn' type='button' onClick={onCancel}>Скасувати</button>
      </div>
    </form>
  );
}

export default AddColumnForm;
