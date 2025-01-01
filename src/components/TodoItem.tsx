import React from 'react';
import { Button } from '@chakra-ui/react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoggedIn: boolean; // 新しくログイン状態を受け取る
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete, isLoggedIn }) => {
  return (
    <li style={{ marginBottom: '10px' }}>
    {todo.title} - {todo.status}
    {isLoggedIn && (
      <>
        <Button
          style={{ backgroundColor: '#6FA9E1', color: '#fff' }}
          size="sm"
          onClick={() => onEdit(todo.id)}
        >
          編集
        </Button>
        <Button
          style={{ backgroundColor: '#E57373', color: '#fff' }}
          size="sm"
          onClick={() => onDelete(todo.id)}
          ml={2}
        >
          削除
        </Button>
      </>
    )}
  </li>
  
  );
};

export default TodoItem;

