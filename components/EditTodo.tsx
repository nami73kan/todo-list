"use client";

import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  status: string;
};

type EditTodoProps = {
  todo: Todo | null;
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  updateTodo: (updatedTodo: Todo) => void;
};

const EditTodo: React.FC<EditTodoProps> = ({ todo, setEditTodo, updateTodo }) => {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("未着手");

  const statusItems = ["未着手", "着手", "完了"]; 

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [todo]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    if (todo) {
      const updatedTodo = { ...todo, title, status };
      updateTodo(updatedTodo);
      setEditTodo(null);
    }
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
      <button onClick={handleSave}>保存</button>
      <button onClick={() => setEditTodo(null)}>キャンセル</button>
    </div>
  );
};

export default EditTodo;
