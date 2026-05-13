import { Radio } from 'antd';

interface SizeEditorProps {
  size?: number;
  sizes?: string[];
  label?: string;
  onChange?: (size: number) => void;
}

export default function SizeEditor({
  size = 0,
  sizes = ['22', '20', '18'],
  label = '标题尺寸',
  onChange,
}: SizeEditorProps) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
      <Radio.Group value={size} onChange={(e) => onChange?.(e.target.value)}>
        {sizes.map((s, index) => (
          <Radio.Button key={index} value={index}>
            {s}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
