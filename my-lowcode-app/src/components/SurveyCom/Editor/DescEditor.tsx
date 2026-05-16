import { Input } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface DescEditorProps {
  type: string;
  status: any;
  onUpdate?: (type: string, value: string) => void;
}

export default function DescEditor(props: DescEditorProps) {
  const { type, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>描述内容</label>
      <Input.TextArea placeholder="请输入描述" rows={3} onChange={handleChange} />
    </div>
  );
}
