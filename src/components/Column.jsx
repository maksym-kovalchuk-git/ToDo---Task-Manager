import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ColumnHeader, AddTaskForm, TaskCard, EditTaskForm, ConfirmDialog } from './';

import { useConfirmDialog } from '../hooks';

import './Column.scss';

/**
 * @param {{
 *   title: string,
 *   columnId: string,
 *   color: string,
 *   tasks: import('../types').Task[],
 *   setTasks: (updater: import('../types').Task[]|(import('../types').Task[] => import('../types').Task[])) => void,
 *   onRenameColumn: (title: string) => void,
 *   onRemoveColumn: () => void,
 *   onChangeColor: (color: string) => void,
 * }} props
 */

function Column({ title, columnId, color, tasks, setTasks, onRenameColumn, onRemoveColumn, onChangeColor }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { confirm, dialogProps } = useConfirmDialog();
  const { setNodeRef: setDroppableRef } = useDroppable({ id: columnId });

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  }

  function handleSaveTask(updatedTask) {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTaskId(null);
  }

  function handleDeleteTask(task) {
    confirm(
      `Видалити завдання «${task.title}»?`,
      () => setTasks(tasks.filter((t) => t.id !== task.id))
    );
  }

  return (
    <>
      <div className='column' style={color ? { '--col-accent': color } : undefined}>
        <ColumnHeader
          title={title}
          color={color}
          taskCount={tasks.length}
          onRename={onRenameColumn}
          onRemove={() =>
            confirm(
              `Видалити колонку «${title}» разом із усіма завданнями?`,
              onRemoveColumn
            )
          }
          onChangeColor={onChangeColor}
        />

        <div className='task-list' ref={setDroppableRef}>
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.length > 0 ? (
              tasks.map((t) =>
                editingTaskId === t.id ? (
                  <EditTaskForm
                    key={t.id}
                    task={t}
                    columnId={columnId}
                    onSave={handleSaveTask}
                    onCancel={() => setEditingTaskId(null)}
                  />
                ) : (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={(task) => setEditingTaskId(task.id)}
                    onDelete={handleDeleteTask}
                  />
                )
              )
            ) : (
              <p className='task-empty'>Поки завдань немає</p>
            )}
          </SortableContext>
        </div>

        {isFormOpen ? (
          <AddTaskForm
            onAdd={handleAddTask}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <div className='add-task'>
            <button className='btn btn-primary' onClick={() => setIsFormOpen(true)}>
              + Нове завдання
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog {...dialogProps} />
    </>
  );
}

export default Column;
