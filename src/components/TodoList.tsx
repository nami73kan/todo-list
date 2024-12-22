import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import { useAuthContext } from '../context/AuthContext';

type Todo = {
  id: number;
  title: string;
  status: '未着手' | '着手' | '完了';
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('全て表示');
  const [sortOrder, setSortOrder] = useState<string>('昇順');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // --- ログイン情報 ---
  const { user, signOut } = useAuthContext();

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');
  
    if (error) {
      console.error('Error fetching todos:', error);
      return; // エラーの場合は処理を終了
    }
  
    if (data && data.length > 0) { // dataが存在し、空ではない場合のみ処理
      setTodos(data as Todo[]); // dataをセット
    } else {
      console.log('No todos found.'); // ログで空データを記録 (デバッグ用)
    }
  };
  
  

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string, status: '未着手' | '着手' | '完了') => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, status }])
      .select();
  
    if (error) {
      console.error('Error adding todo:', error);
    } else if (data) { // データが存在する場合のみ追加
      setTodos((prev) => [...prev, ...(data as Todo[])]);
    }
  };
  

  const updateTodo = async (id: number, updatedData: Partial<Todo>) => {
    const { data, error } = await supabase
      .from('todos')
      .update(updatedData)
      .eq('id', id)
      .select();
  
    if (error) {
      console.error('Error updating todo:', error);
    } else if (data) { // データを使う処理を追加
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );
    }
  };
  

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) setEditingTodo(todoToEdit);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
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

      {/* フィルターとソートの配置 */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          フィルター:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="全て表示">全て表示</option>
            <option value="未着手">未着手</option>
            <option value="着手">着手</option>
            <option value="完了">完了</option>
          </select>
        </label>

        <label style={{ marginLeft: '10px' }}>
          ソート:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="昇順">昇順</option>
            <option value="降順">降順</option>
          </select>
        </label>
      </div>

      <TodoForm
        onSave={(todo) => {
          if (todo.id) {
            updateTodo(todo.id, { title: todo.title, status: todo.status });
          } else {
            addTodo(todo.title, todo.status);
          }
          setEditingTodo(null);
        }}
        initialData={editingTodo || undefined}
      />

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

      {/* ログイン・サインアップの配置 */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        {user ? (
          <div>
            <p>ログイン中: {user.email}</p>
            <button onClick={signOut}>ログアウト</button>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </div>
  );
};

export default TodoList;
