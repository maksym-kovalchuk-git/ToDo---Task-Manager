/** @type {{ value: string, label: string }[]} */
export const COLUMN_COLOR_OPTIONS = [
  { value: '#5B8DEF', label: 'Синій' },
  { value: '#F2B544', label: 'Жовтий' },
  { value: '#4FAE7E', label: 'Зелений' },
  { value: '#A678F0', label: 'Фіолетовий' },
  { value: '#C75450', label: 'Червоний' },
  { value: '#5DCAA5', label: 'Бірюзовий' },
];

/** @type {{ id: string, title: string, color: string }[]} */
export const DEFAULT_COLUMNS = [
  { id: 'col-todo', title: 'Нові завдання', color: '#5B8DEF' },
  { id: 'col-progress', title: 'В процесі', color: '#F2B544' },
  { id: 'col-done', title: 'Завершені', color: '#4FAE7E' },
];

/** @type {Record<string, import('./types').Task[]>} */
export const DEFAULT_TASKS_BY_COLUMN = {
  'col-todo': [],
  'col-progress': [],
  'col-done': [],
};
