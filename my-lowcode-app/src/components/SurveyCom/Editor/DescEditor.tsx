import { Input } from 'antd'
import { useContext } from 'react'
import { UpdateStatusContext } from '@/views/MaterialView/Layout'

export default function DescEditor(props) {
  const updateStatus = useContext(UpdateStatusContext)
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>描述内容</label>
      <Input.TextArea
        placeholder="请输入描述"
        rows={3}
        onChange={(e) => updateStatus(props.type, e.target.value)}
      />
    </div>
  )
}
