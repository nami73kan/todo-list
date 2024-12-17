import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <li>
      {todo.title} - {todo.status}
      <button onClick={() => onEdit(todo.id)}>編集</button>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </li>
  );
};

export default TodoItem;
