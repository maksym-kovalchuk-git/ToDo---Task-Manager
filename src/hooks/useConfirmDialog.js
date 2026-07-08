import { useState, useCallback } from 'react';

const SUPPRESS_KEY = 'delete-confirm-suppress-until';
const SUPPRESS_DURATION = 60 * 60 * 1000; // 1 година в мс

// ---------------------------------------------------------------
// useConfirmDialog
//
// Повертає:
//   dialogProps  — передається у <ConfirmDialog {...dialogProps} />
//   confirm(message, onConfirm) — викликати перед будь-яким видаленням
// ---------------------------------------------------------------
export function useConfirmDialog() {
  const [state, setState] = useState({
    open: false,
    message: '',
    onConfirm: null,
  });

  // Перевіряємо чи користувач поставив "не запитувати" і година ще не минула
  function isSuppressed() {
    try {
      const until = localStorage.getItem(SUPPRESS_KEY);
      if (!until) return false;
      return Date.now() < Number(until);
    } catch {
      return false;
    }
  }

  function suppress() {
    try {
      localStorage.setItem(SUPPRESS_KEY, String(Date.now() + SUPPRESS_DURATION));
    } catch {
      // localStorage недоступний — ігноруємо
    }
  }

  // Головна функція — викликати замість window.confirm
  // message: рядок "Видалити завдання «Назва»?"
  // onConfirm: функція, яка виконує саме видалення
  const confirm = useCallback((message, onConfirm) => {
    if (isSuppressed()) {
      // Година ще не минула — видаляємо одразу, без діалогу
      onConfirm();
      return;
    }

    setState({ open: true, message, onConfirm });
  }, []);

  function handleConfirm(doSuppress) {
    if (doSuppress) suppress();
    state.onConfirm?.();
    setState({ open: false, message: '', onConfirm: null });
  }

  function handleCancel() {
    setState({ open: false, message: '', onConfirm: null });
  }

  const dialogProps = {
    open: state.open,
    message: state.message,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  };

  return { confirm, dialogProps };
}