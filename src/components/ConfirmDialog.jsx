import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ConfirmDialog.scss';

// ---------------------------------------------------------------
// ConfirmDialog
//
// Props:
//   open       — boolean, чи показувати діалог
//   message    — string, що саме видаляється ("Видалити завдання «...»?")
//   onConfirm  — (doSuppress: boolean) => void
//   onCancel   — () => void
// ---------------------------------------------------------------

export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  const [suppress, setSuppress] = useState(false);

  // Скидаємо чекбокс кожен раз при відкритті нового діалогу
  useEffect(() => {
    if (open) setSuppress(false);
  }, [open]);

  // Закриття по Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className='cd-overlay' onClick={onCancel}>
      <div
        className='cd'
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='cd-title'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Іконка попередження */}
        <div className='cd__icon'>
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        <h2 className='cd__title' id='cd-title'>
          Підтвердження видалення
        </h2>

        <p className='cd__message'>{message}</p>

        <label className='cd__suppress'>
          <input
            type='checkbox'
            checked={suppress}
            onChange={(e) => setSuppress(e.target.checked)}
          />
          <span>Не запитувати протягом години</span>
        </label>

        <div className='cd__actions'>
          <button
            type='button'
            className='cd__btn cd__btn--cancel'
            onClick={onCancel}
          >
            Скасувати
          </button>
          <button
            type='button'
            className='btn btn-danger cd__btn--confirm cd__btn'
            onClick={() => onConfirm(suppress)}
            autoFocus
          >
            Видалити
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}