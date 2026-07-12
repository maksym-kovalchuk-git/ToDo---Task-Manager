import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useBgPreset } from '../hooks';
import { BG_PRESETS } from '../constants';
import './BgSwitch.scss';

function PaletteIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10a2 2 0 0 0 2-2v-.5a1.5 1.5 0 0 1 1.5-1.5H17a5 5 0 0 0 5-5c0-5.523-4.477-9-10-9Z'
        stroke='currentColor' strokeWidth='1.8' />
      <circle cx='8'  cy='10' r='1.5' fill='currentColor' />
      <circle cx='12' cy='7'  r='1.5' fill='currentColor' />
      <circle cx='16' cy='10' r='1.5' fill='currentColor' />
    </svg>
  );
}

function BgSwitch() {
  const { presetId, setPresetId } = useBgPreset();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const btnRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX,
      });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        popupRef.current && !popupRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='bg-switch' ref={btnRef}>
      <button
        className={`bg-switch__trigger ${open ? 'bg-switch__trigger--active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        title='Background'
      >
        <PaletteIcon />
      </button>

      {open && createPortal(
        <div
          className='bg-switch__popup'
          ref={popupRef}
          style={{ top: coords.top, left: coords.left }}
        >
          {BG_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className={`bg-preset-dot ${preset.id === presetId ? 'bg-preset-dot--active' : ''}`}
              style={{ background: preset.background, backgroundSize: 'cover' }}
              onClick={() => { setPresetId(preset.id); setOpen(false); }}
              title={preset.label}
            />
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

export default BgSwitch;
