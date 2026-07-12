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
export const getDefaultColumns = (t) => [
  { id: 'col-todo',     title: t('defaultColumns.todo'),     color: '#5B8DEF' },
  { id: 'col-progress', title: t('defaultColumns.progress'), color: '#F2B544' },
  { id: 'col-done',     title: t('defaultColumns.done'),     color: '#4FAE7E' },
];

/** @type {Record<string, import('./types').Task[]>} */
export const DEFAULT_TASKS_BY_COLUMN = {
  'col-todo': [],
  'col-progress': [],
  'col-done': [],
};

/** @type {{ id: string, label: string, background: string }[]} */
export const BG_PRESETS = [
  {
    id: 'ocean',
    label: 'Ocean',
    background: `
      radial-gradient(circle at 10% 90%, rgba(91, 141, 239, 0.10), transparent 45%),
      radial-gradient(circle at 85% 75%, rgba(60, 90, 180, 0.07), transparent 50%),
      linear-gradient(180deg, #0D1119 0%, #131A29 55%, #1B2436 100%)
    `,
  },
  {
    id: 'nebula',
    label: 'Nebula',
    background: `
      radial-gradient(circle at 15% 85%, rgba(166,120,240,0.12), transparent 45%),
      radial-gradient(circle at 80% 20%, rgba(100,60,200,0.08), transparent 50%),
      linear-gradient(180deg, #0F0D1A 0%, #150F28 55%, #1A1535 100%)
    `,
  },
  {
    id: 'forest',
    label: 'Forest',
    background: `
      radial-gradient(circle at 20% 80%, rgba(79,174,126,0.10), transparent 45%),
      radial-gradient(circle at 75% 25%, rgba(40,120,80,0.07), transparent 50%),
      linear-gradient(180deg, #0C1410 0%, #111D15 55%, #162418 100%)
    `,
  },
   {
    id: 'rose',
    label: 'Rose',
    background: `
      radial-gradient(circle at 10% 90%, rgba(220, 100, 140, 0.09), transparent 45%),
      radial-gradient(circle at 85% 20%, rgba(160, 60, 100, 0.06), transparent 50%),
      linear-gradient(180deg, #180D12 0%, #220F18 55%, #2A1220 100%)
    `,
  },
  {
    id: 'steel',
    label: 'Steel',
    background: `
      radial-gradient(circle at 20% 80%, rgba(140, 155, 180, 0.07), transparent 45%),
      radial-gradient(circle at 80% 20%, rgba(100, 115, 140, 0.05), transparent 50%),
      linear-gradient(180deg, #0D0E12 0%, #121318 55%, #16181F 100%)
    `,
  },
  {
    id: 'midnight',
    label: 'Midnight',
    background: `
      linear-gradient(180deg, #08080F 0%, #0D0D18 55%, #121220 100%)
    `,
  },
];