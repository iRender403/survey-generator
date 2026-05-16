import { ColorPicker } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface ColorEditorProps {
  type: string;
  status: {
    status: string;
  };
  onUpdate?: (type: string, value: string) => void;
}

export default function ColorEditor(props: ColorEditorProps) {
  const { type, status, onUpdate } = props;
  const updateStatus = useContext(UpdateStatusContext);

  const handleChange = (value: string) => {
    if (onUpdate) {
      onUpdate(type, value);
    } else if (updateStatus) {
      updateStatus(type, value);
    }
  };

  const color = status.status || '#000000';

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>颜色选择</label>
      <ColorPicker value={color} onChange={(value) => handleChange(value.toHexString())} />
    </div>
  );
}
