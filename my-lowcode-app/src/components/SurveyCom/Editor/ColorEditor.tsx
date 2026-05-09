import { ColorPicker } from 'antd'

interface ColorEditorProps {
  color?: string
  onChange?: (color: string) => void
}

export default function ColorEditor({ color = '#000000', onChange }: ColorEditorProps) {
  
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>颜色选择</label>
      <ColorPicker
        value={color}
        onChange={(value) => onChange?.(value.toHexString())}
      />
    </div>
  )
}
