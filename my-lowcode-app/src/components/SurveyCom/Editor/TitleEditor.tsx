import { Input } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface TitleEditorProps {
  type: string;
  status: any;
  onUpdate?: (type: string, value: string) => void;
}

export default function TitleEditor(props: TitleEditorProps) {
  const { type, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>标题</label>
      <Input placeholder="请输入标题" onChange={handleChange} />
    </div>
  );
}
