import { Radio } from 'antd';

interface WeightEditorProps {
  weight?: number;
  onChange?: (weight: number) => void;
}

const weights = ['加粗', '正常'];

export default function WeightEditor({ weight = 0, onChange }: WeightEditorProps) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>字体粗细</label>
      <Radio.Group value={weight} onChange={(e) => onChange?.(e.target.value)}>
        {weights.map((w, index) => (
          <Radio.Button key={index} value={index}>
            {w}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
