import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoggedIn: boolean; // 新しくログイン状態を受け取る
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, isLoggedIn }) => {
  return (
    <li>
      {todo.title} - {todo.status}
      {isLoggedIn && ( // ログイン中のみボタン表示
        <>
          <button onClick={() => onEdit(todo.id)}>編集</button>
          <button onClick={() => onDelete(todo.id)}>削除</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;

