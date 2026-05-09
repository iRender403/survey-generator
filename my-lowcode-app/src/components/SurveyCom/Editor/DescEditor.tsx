import { Input } from 'antd'

export default function DescEditor() {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>描述内容</label>
      <Input.TextArea placeholder="请输入描述" rows={3} />
    </div>
  )
}
