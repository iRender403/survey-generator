import { Radio } from 'antd'

interface PositionEditorProps {
  position?: number
  onChange?: (position: number) => void
}

const positions = ['左对齐', '居中对齐']

export default function PositionEditor({ position = 0, onChange }: PositionEditorProps) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>居中设置</label>
      <Radio.Group
        value={position}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {positions.map((pos, index) => (
          <Radio.Button key={index} value={index}>
            {pos}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
}
