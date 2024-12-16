import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type Todo = {
  id: number;
  title: string;
  status: '未着手' | '着手' | '完了';
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string, status: '未着手' | '着手' | '完了') => Promise<void>;
  updateTodo: (id: number, updatedData: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data as Todo[]);
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
    } else {
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
    } else if (data) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
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

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within a TodoProvider');
  return context;
};
