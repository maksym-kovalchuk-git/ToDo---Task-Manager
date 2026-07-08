import { useRef } from 'react';

/**
 * Scroll дошки перетягуванням мишки по порожньому фону.
 * Повертає `boardRef` і spread-ready `boardHandlers` для div.board.
 */
export function useBoardScroll() {
  const boardRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  function onMouseDown(e) {
    if (e.target.closest('.column, .add-column-form, .btn-add-column')) return;
    const board = boardRef.current;
    if (!board) return;
    dragState.current = {
      isDragging: true,
      startX: e.pageX - board.offsetLeft,
      scrollLeft: board.scrollLeft,
    };
    board.classList.add('board--dragging');
  }

  function onMouseMove(e) {
    if (!dragState.current.isDragging) return;
    const board = boardRef.current;
    if (!board) return;
    e.preventDefault();
    const x = e.pageX - board.offsetLeft;
    board.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
  }

  function onMouseUp() {
    dragState.current.isDragging = false;
    boardRef.current?.classList.remove('board--dragging');
  }

  return {
    boardRef,
    boardHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
  };
}
