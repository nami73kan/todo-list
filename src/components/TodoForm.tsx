import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoFormProps {
  onSave: (todo: Todo) => void;
  initialData?: Todo;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [status, setStatus] = useState<'未着手' | '着手' | '完了'>(initialData?.status || '未着手');

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: initialData?.id || Date.now(),
        title,
        status,
      });
      setTitle('');
      setStatus('未着手');
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
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as '未着手' | '着手' | '完了')}
      >
        <option value="未着手">未着手</option>
        <option value="着手">着手</option>
        <option value="完了">完了</option>
      </select>
      <button onClick={handleSave}>{initialData ? '保存' : '追加'}</button>
    </div>
  );
};

export default TodoForm;
