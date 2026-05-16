import { Radio } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface SizeEditorProps {
  type: string;
  status: {
    currentStatus: number;
    status: string[];
  };
  onUpdate?: (type: string, value: number) => void;
}

export default function SizeEditor(props: SizeEditorProps) {
  const { type, status, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (value: number) => {
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  const sizes = status.status || ['22', '20', '18'];
  const currentSize = status.currentStatus || 0;

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>标题尺寸</label>
      <Radio.Group value={currentSize} onChange={(e) => handleChange(e.target.value)}>
        {sizes.map((s, index) => (
          <Radio.Button key={index} value={index}>
            {s}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
