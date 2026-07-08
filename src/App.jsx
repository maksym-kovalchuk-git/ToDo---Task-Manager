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

import { Column, TaskDragPreview, AddColumnForm } from './components';
import { useBoard, useBoardScroll } from './hooks';

import './App.scss';

function App() {
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { boardRef, boardHandlers } = useBoardScroll();

  return (
    <div id='center'>
      <h1 className='app-title'>ToDo - Task Manager</h1>
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
                + Додати колонку
              </button>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeTask ? <TaskDragPreview task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
