import { useState } from 'react';
import { COLUMN_COLOR_OPTIONS } from '../constants';

import { useTranslation } from 'react-i18next';

import './ColumnHeader.scss';

/**
 * @param {{
 *   title: string,
 *   color: string,
 *   taskCount: number,
 *   onRename: (title: string) => void,
 *   onRemove: () => void,
 *   onChangeColor: (color: string) => void,
 * }} props
 */
function ColumnHeader({ title, color, taskCount, onRename, onRemove, onChangeColor }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingColor, setIsEditingColor] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  const { t } = useTranslation();

  function handleTitleSubmit(e) {
    e.preventDefault();
    onRename?.(titleDraft);
    setIsEditingTitle(false);
  }

  function handleTitleCancel() {
    setTitleDraft(title);
    setIsEditingTitle(false);
  }

  function handleOpenTitleEdit() {
    setIsEditingColor(false);
    setTitleDraft(title);
    setIsEditingTitle(true);
  }

  function handleColorChange(newColor) {
    onChangeColor?.(newColor);
    setIsEditingColor(false);
  }

  return (
    <>
      <div className='column-header'>
        {isEditingTitle ? (
          <form className='column-title-form' onSubmit={handleTitleSubmit}>
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && handleTitleCancel()}
              maxLength={18}
            />
            <div className='column-title-actions'>
              <button
                type='submit'
                className='column-title-btn column-title-btn--confirm'
                aria-label={t('saveTitle')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type='button'
                className='column-title-btn column-title-btn--cancel'
                onClick={handleTitleCancel}
                aria-label={t('cancel')}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        ) : (
          <h2
            onDoubleClick={handleOpenTitleEdit}
            title={t('doubleClickToEdit')}
          >
            {title}
          </h2>
        )}

        <div className='column-header-actions'>
          {!isEditingTitle && !isEditingColor && (
            <button
              type='button'
              className='column-color-btn'
              style={{ '--btn-color': color || '#A678F0' }}
              onClick={() => setIsEditingColor(true)}
              aria-label={t('changeColumnColor')}
            />
          )}
          <span className='column-count'>{taskCount}</span>
          {onRemove && (
            <button
              type='button'
              className='column-remove-btn'
              onClick={onRemove}
              aria-label={t('deleteColumn')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {isEditingColor && (
        <div className='column-color-picker'>
          <span>{t('colorSelect')}</span>
          <div className='column-color-dots'>
            {COLUMN_COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type='button'
                className={`color-picker-dot ${color === opt.value ? 'color-picker-dot--active' : ''}`}
                style={{ '--dot-color': opt.value }}
                onClick={() => handleColorChange(opt.value)}
                aria-label={opt.label}
                aria-pressed={color === opt.value}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ColumnHeader;
