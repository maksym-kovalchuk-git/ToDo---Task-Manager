import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { useTranslation } from 'react-i18next';

import "./DatePicker.scss";

// ---------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------

function pad2(n) { return String(n).padStart(2, "0"); }

function formatDate(date) {
  if (!date) return "";
  return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function isSameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, outside: true, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, outside: false, date: new Date(year, month, d) });
  }
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay, outside: true, date: new Date(year, month + 1, nextDay) });
    nextDay++;
  }
  return cells;
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 3V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatePicker({ value = null, onChange, placeholder }) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState((value || today).getFullYear());
  const [viewMonth, setViewMonth] = useState((value || today).getMonth());
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 280, isUpwards: false });

  const rootRef = useRef(null);
  const popupRef = useRef(null);

  const { t } = useTranslation();
  const months = t('months', { returnObjects: true });
  const weekdays = t('weekdays', { returnObjects: true });
  const resolvedPlaceholder = placeholder ?? t('pickDate');

  useEffect(() => {
    if (open && rootRef.current) {
      const updatePosition = () => {
        if (!rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        const THRESHOLD = 320;
        
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        let calculatedTop;
        let isUpwards = false;

        if (spaceBelow < THRESHOLD && spaceAbove > THRESHOLD) {
          calculatedTop = rect.top + window.scrollY - 6;
          isUpwards = true;
        } else {
          calculatedTop = rect.bottom + window.scrollY + 6;
          isUpwards = false;
        }

        setCoords({ top: calculatedTop, left: rect.left + window.scrollX, width: rect.width, isUpwards });
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target) && popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cells = buildMonthGrid(viewYear, viewMonth);

  return (
    <div className="dp" ref={rootRef}>
      <div className={`dp__field ${open ? "dp__field--open" : ""}`}>
        <button type="button" className="dp__value" onClick={() => setOpen(!open)}>
          {value ? formatDate(value) : resolvedPlaceholder}
        </button>
        {value && (
          <button type="button" className="dp__clear-btn" onClick={() => onChange?.(null)}>
            ×
          </button>
        )}
        <button type="button" className="dp__icon-btn" onClick={() => setOpen(!open)}>
          <CalendarIcon />
        </button>
      </div>

      {open && createPortal(
        <div className="dp__popup" ref={popupRef} style={{
            position: "absolute",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            minWidth: Math.max(260, coords.width),
            transform: coords.isUpwards ? "translateY(-100%)" : "none",
            zIndex: 9999
          }}>
          <div className="dp__header">
            <button type="button" className="dp__nav-btn" onClick={() => { if(viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else { setViewMonth(m => m-1); } }}>
              <ChevronLeft />
            </button>
            <div className="dp__title">
              <span>{months[viewMonth]}</span>
              <span className="dp__title-year">{viewYear}</span>
            </div>
            <button type="button" className="dp__nav-btn" onClick={() => { if(viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); } else { setViewMonth(m => m+1); } }}>
              <ChevronRight />
            </button>
          </div>
          <div className="dp__weekdays">
            {weekdays.map((wd) => <div className="dp__weekday" key={wd}>{wd}</div>)}
          </div>
          <div className="dp__days">
            {cells.map((cell, idx) => (
              <button key={idx} className={`dp__day ${cell.outside ? "dp__day--outside" : ""} ${isSameDay(cell.date, today) ? "dp__day--today" : ""} ${isSameDay(cell.date, value) ? "dp__day--selected" : ""}`} onClick={() => { onChange?.(cell.date); setOpen(false); }}>
                {cell.day}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default DatePicker;