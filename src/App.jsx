import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { BoardHeader, Column, TaskDragPreview, AddColumnForm } from './components';
import { useBgPreset, useBoard, useBoardScroll } from './hooks';

import { useTranslation } from 'react-i18next';

import './App.scss';

function App() {
  useBgPreset();

  const {
    columns,
    tasksByColumn,
    activeTask,
    isAddingColumn,
    newColumnTitle,
    newColumnColor,
    setIsAddingColumn,
    setNewColumnTitle,
    setNewColumnColor,
    addColumn,
    cancelAddColumn,
    renameColumn,
    changeColumnColor,
    removeColumn,
    setColumnTasks,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useBoard();

  const { t } = useTranslation();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { boardRef, boardHandlers } = useBoardScroll();

  return (
    <>
      <BoardHeader />
      <div id='center'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div
            className='board'
            ref={boardRef}
            {...boardHandlers}
          >
            {columns.map((col) => (
              <Column
                key={col.id}
                title={col.title}
                columnId={col.id}
                color={col.color}
                tasks={tasksByColumn[col.id] ?? []}
                setTasks={(updater) => setColumnTasks(col.id, updater)}
                onRenameColumn={(newTitle) => renameColumn(col.id, newTitle)}
                onRemoveColumn={() => removeColumn(col.id)}
                onChangeColor={(newColor) => changeColumnColor(col.id, newColor)}
              />
            ))}

            <div className='add-column'>
              {isAddingColumn ? (
                <AddColumnForm
                  title={newColumnTitle}
                  color={newColumnColor}
                  onTitleChange={setNewColumnTitle}
                  onColorChange={setNewColumnColor}
                  onSubmit={addColumn}
                  onCancel={cancelAddColumn}
                />
              ) : (
                <button className='btn btn-add-column' onClick={() => setIsAddingColumn(true)}>
                  + {t('addColumn')}
                </button>
              )}
            </div>
          </div>

          <DragOverlay>
            {activeTask ? <TaskDragPreview task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
