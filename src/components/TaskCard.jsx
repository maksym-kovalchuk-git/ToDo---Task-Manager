import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.scss';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${task.priority ? 'priority' : ''} ${isDragging ? 'task-card--dragging' : ''}`}
      {...attributes}
    >
    <div className='task-drag-handle' {...listeners}>
        {task.priority && <span className='task-priority-tag'>Важливо</span>}
        <h4 className='task-title' onPointerDown={(e) => e.stopPropagation()}>{task.title}</h4>
        <p className='task-description'>
            {task.description}
        </p>
        <div className='task-meta'>
            <span>Додано: {task.date}</span>
            {task.deadline && (
            <span className='deadline'>
                Дедлайн: {new Date(task.deadline).toLocaleDateString('uk-UA')}
            </span>
            )}
        </div>
    
      <div className='task-actions'>
        <button className='btn' onPointerDown={(e) => e.stopPropagation()} onClick={() => onEdit(task)}>Редагувати</button>
        <button className='btn btn-danger'onPointerDown={(e) => e.stopPropagation()} onClick={() => onDelete(task)}>Видалити</button>
      </div>
    </div>
    </div>
  );
}