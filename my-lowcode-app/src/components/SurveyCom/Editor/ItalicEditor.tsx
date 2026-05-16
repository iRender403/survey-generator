import { Radio } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface ItalicEditorProps {
  type: string;
  status: {
    currentStatus: number;
    status: string[];
  };
  onUpdate?: (type: string, value: number) => void;
}

const italics = ['斜体', '正常'];

export default function ItalicEditor(props: ItalicEditorProps) {
  const { type, status, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (value: number) => {
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  const currentItalic = status.currentStatus || 0;

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>斜体设置</label>
      <Radio.Group value={currentItalic} onChange={(e) => handleChange(e.target.value)}>
        {italics.map((i, index) => (
          <Radio.Button key={index} value={index}>
            {i}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
