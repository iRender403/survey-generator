import { Radio } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface WeightEditorProps {
  type: string;
  status: {
    currentStatus: number;
    status: string[];
  };
  onUpdate?: (type: string, value: number) => void;
}

const weights = ['加粗', '正常'];

export default function WeightEditor(props: WeightEditorProps) {
  const { type, status, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (value: number) => {
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  const currentWeight = status.currentStatus || 0;

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>字体粗细</label>
      <Radio.Group value={currentWeight} onChange={(e) => handleChange(e.target.value)}>
        {weights.map((w, index) => (
          <Radio.Button key={index} value={index}>
            {w}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
