"use client";

import React from "react";

type Todo = {
  id: number;
  title: string;
  status: string;
};

type TodoListProps = {
  todos: Todo[];
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

const TodoList: React.FC<TodoListProps> = ({ todos, setEditTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {`(${todo.status}) ${todo.title}`}
          <button onClick={() => setEditTodo(todo)}>編集</button>
          <button>削除</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
