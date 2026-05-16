import { Radio } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface PositionEditorProps {
  type: string;
  status: {
    currentStatus: number;
    status: string[];
  };
  onUpdate?: (type: string, value: number) => void;
}

const positions = ['左对齐', '居中对齐'];

export default function PositionEditor(props: PositionEditorProps) {
  const { type, status, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (value: number) => {
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  const currentPosition = status.currentStatus || 0;

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>对齐方式</label>
      <Radio.Group value={currentPosition} onChange={(e) => handleChange(e.target.value)}>
        {positions.map((pos, index) => (
          <Radio.Button key={index} value={index}>
            {pos}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
