import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';

import useLocalStorage from './useLocalStorage';
import { COLUMN_COLOR_OPTIONS, getDefaultColumns, DEFAULT_TASKS_BY_COLUMN } from '../constants';

/**
 * @typedef {import('../types').Task} Task
 * @typedef {import('../types').Column} Column
 */

/**
 * Інкапсулює весь стан і логіку kanban-дошки.
 * App.jsx лишається тонким і просто рендерить.
 */
export function useBoard() {
  const { t } = useTranslation();
  const [columns, setColumns] = useLocalStorage('kanban-columns', getDefaultColumns(t));
  const [tasksByColumn, setTasksByColumn] = useLocalStorage('kanban-tasks', DEFAULT_TASKS_BY_COLUMN);
  const [activeTask, setActiveTask] = useState(/** @type {Task|null} */ (null));

  // ---- Add-column form state ----
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState(COLUMN_COLOR_OPTIONS[0].value);

  // ---- Helpers ----

  /** @param {string} taskId */
  function findColumnIdByTaskId(taskId) {
    return Object.keys(tasksByColumn).find((colId) =>
      tasksByColumn[colId].some((t) => t.id === taskId)
    );
  }

  // ---- DnD handlers ----

  function handleDragStart(event) {
    const colId = findColumnIdByTaskId(event.active.id);
    const task = tasksByColumn[colId]?.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const colId = findColumnIdByTaskId(active.id);
    if (!colId) return;

    setTasksByColumn((prev) => {
      const items = prev[colId];
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev;
      return { ...prev, [colId]: arrayMove(items, oldIndex, newIndex) };
    });
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const fromColId = findColumnIdByTaskId(active.id);
    const toColId = tasksByColumn[over.id] ? over.id : findColumnIdByTaskId(over.id);

    if (!fromColId || !toColId || fromColId === toColId) return;

    setTasksByColumn((prev) => {
      const fromItems = [...prev[fromColId]];
      const taskIndex = fromItems.findIndex((t) => t.id === active.id);
      if (taskIndex === -1) return prev;
      const [movedTask] = fromItems.splice(taskIndex, 1);

      const toItems = [...prev[toColId]];
      const overIndex = toItems.findIndex((t) => t.id === over.id);
      if (overIndex === -1) {
        toItems.push(movedTask);
      } else {
        toItems.splice(overIndex, 0, movedTask);
      }

      return { ...prev, [fromColId]: fromItems, [toColId]: toItems };
    });
  }

  // ---- Column CRUD ----

  /** @param {React.FormEvent} e */
  function addColumn(e) {
    e.preventDefault();
    const title = newColumnTitle.trim();
    if (!title) return;

    const id = `col-${Date.now()}`;
    setColumns((prev) => [...prev, { id, title, color: newColumnColor }]);
    setTasksByColumn((prev) => ({ ...prev, [id]: [] }));
    setNewColumnTitle('');
    setNewColumnColor(COLUMN_COLOR_OPTIONS[0].value);
    setIsAddingColumn(false);
  }

  function cancelAddColumn() {
    setIsAddingColumn(false);
    setNewColumnTitle('');
    setNewColumnColor(COLUMN_COLOR_OPTIONS[0].value);
  }

  /**
   * @param {string} columnId
   * @param {string} newTitle
   */
  function renameColumn(columnId, newTitle) {
    const title = newTitle.trim();
    if (!title) return;
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, title } : col))
    );
  }

  /**
   * @param {string} columnId
   * @param {string} newColor
   */
  function changeColumnColor(columnId, newColor) {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, color: newColor } : col))
    );
  }

  /** @param {string} columnId */
  function removeColumn(columnId) {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setTasksByColumn((prev) => {
      const { [columnId]: _removed, ...rest } = prev;
      return rest;
    });
  }

  // ---- Task helpers ----

  /**
   * @param {string} columnId
   * @param {Task[]|(Task[] => Task[])} updater
   */
  function setColumnTasks(columnId, updater) {
    setTasksByColumn((prev) => ({
      ...prev,
      [columnId]: typeof updater === 'function' ? updater(prev[columnId] ?? []) : updater,
    }));
  }

  return {
    // state
    columns,
    tasksByColumn,
    activeTask,
    isAddingColumn,
    newColumnTitle,
    newColumnColor,
    // add-column form
    setIsAddingColumn,
    setNewColumnTitle,
    setNewColumnColor,
    addColumn,
    cancelAddColumn,
    // column CRUD
    renameColumn,
    changeColumnColor,
    removeColumn,
    // task helpers
    setColumnTasks,
    // dnd
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
}
