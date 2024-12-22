import { useState, useEffect } from 'react';
//import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

type TodoFormProps = {
  onSave?: (todo: Todo) => void;
  initialData?: Todo;
};

const TodoForm: React.FC<TodoFormProps> = ({ onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'未着手' | '着手' | '完了'>('未着手');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSave = () => {
    if (onSave) {
      onSave({ ...initialData, title, status } as Todo);
    }
    setTitle('');
    setStatus('未着手');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as '未着手' | '着手' | '完了')}>
        <option value="未着手">未着手</option>
        <option value="着手">着手</option>
        <option value="完了">完了</option>
      </select>
      <button onClick={handleSave}>{initialData ? '更新' : '追加'}</button>
    </div>
  );
};

export default TodoForm;
