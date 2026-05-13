import { Radio } from 'antd';

interface ItalicEditorProps {
  italic?: number;
  onChange?: (italic: number) => void;
}

const italics = ['斜体', '正常'];

export default function ItalicEditor({ italic = 0, onChange }: ItalicEditorProps) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>标题加粗</label>
      <Radio.Group value={italic} onChange={(e) => onChange?.(e.target.value)}>
        {italics.map((i, index) => (
          <Radio.Button key={index} value={index}>
            {i}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
