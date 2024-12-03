import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('全て表示');
  const [sortOrder, setSortOrder] = useState<string>('昇順');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAddTodo = (todo: Todo) => {
    setTodos((prev) => (editingTodo ? prev.map((t) => (t.id === todo.id ? todo : t)) : [...prev, todo]));
    setEditingTodo(null);
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) setEditingTodo(todoToEdit);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    filter === '全て表示' ? true : todo.status === filter
  );

  const sortedTodos = [...filteredTodos].sort((a, b) =>
    sortOrder === '昇順' ? a.id - b.id : b.id - a.id
  );

  return (
    <div>
      <h1>Todoリスト</h1>

      {/* フィルター */}
      <label>
        フィルター:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="全て表示">全て表示</option>
          <option value="未着手">未着手</option>
          <option value="着手">着手</option>
          <option value="完了">完了</option>
        </select>
      </label>

      {/* ソート */}
      <label>
        ソート:
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="昇順">昇順</option>
          <option value="降順">降順</option>
        </select>
      </label>

      {/* フォーム */}
      <TodoForm onSave={handleAddTodo} initialData={editingTodo || undefined} />

      {/* リスト */}
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
