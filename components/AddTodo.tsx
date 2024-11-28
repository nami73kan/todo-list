"use client";

import React, { useState } from "react";

type Todo = {
  id: number;
  title: string;
  status: string;
};

type AddTodoProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const AddTodo: React.FC<AddTodoProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>(""); 
  const [status, setStatus] = useState<string>("未着手");

  const statusItems = ["未着手", "着手", "完了"];

  const handleAddTodo = () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      status,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setStatus("未着手");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {statusItems.map((statusItem) => (
          <option value={statusItem} key={statusItem}>
            {statusItem}
          </option>
        ))}
      </select>
      <button onClick={handleAddTodo}>追加</button>
    </div>
  );
};

export default AddTodo;

