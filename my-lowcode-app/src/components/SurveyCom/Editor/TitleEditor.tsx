import { Input } from 'antd'

export default function TitleEditor() {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>标题内容</label>
      <Input placeholder="请输入标题" />
    </div>
  )
}
