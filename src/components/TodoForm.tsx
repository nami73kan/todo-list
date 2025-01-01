import { useState, useEffect } from 'react';
//import { useTodoContext } from '../context/TodoContext';
import { Button } from '@chakra-ui/react'; 
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
    // タイトルが空白の場合は処理を中断
    if (!title.trim()) {
      alert('タイトルを入力してください！'); // ユーザーに警告
      return; // 処理終了
    }
  
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
      <Button
  style={{ backgroundColor: '#7AC87A', color: '#fff' }}
  size="sm"
  onClick={handleSave}
  isDisabled={!title.trim()}
>
  {initialData ? '更新' : '追加'}
</Button>

    </div>
  );
};

export default TodoForm;
