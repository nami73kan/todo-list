"use client";

import React, { useState } from "react";
import AddTodo from "../../components/AddTodo";
import TodoList from "../../components/TodoList";
import EditTodo from "../../components/EditTodo";

type Todo = {
  id: number;
  title: string;
  status: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "First Task", status: "未着手" },
    { id: 2, title: "Second Task", status: "進行中" },
  ]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null); // 編集対象のTodo

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  return (
    <div>
      <h1>TODOリスト</h1>
      {editTodo ? (
        <EditTodo
          todo={editTodo}
          setEditTodo={setEditTodo}
          updateTodo={updateTodo}
        />
      ) : (
        <>
          <AddTodo todos={todos} setTodos={setTodos} />
          <TodoList todos={todos} setEditTodo={setEditTodo} />
        </>
      )}
    </div>
  );
}

