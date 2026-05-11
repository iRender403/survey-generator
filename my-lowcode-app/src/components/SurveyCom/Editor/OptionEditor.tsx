import { Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';
export default function OptionEditor(props) {
  const { type, status } = props as any;
  const options = status.status;
  const updateStatus = useContext(UpdateStatusContext);
  function updateOptions(newOptions: string[]) {
    updateStatus('status', { ...status, newOptions });
  }
  return (
    <div>
      {/* 标题和添加按钮*/}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>题目选项</span>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => updateOptions([...options, ''])} size="small" />
      </div>

      {options.map((option, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <Input 
          value={option} 
          style={{ flex: 1, marginRight: 8 }}
          onChange={(e) => updateOptions([...options, e.target.value])}
           />
          <MinusCircleOutlined 
          onClick={() => updateOptions(options.filter((_, i) => i !== index))}
          style={{ color: '#ff4d4f', fontSize: 20, cursor: 'pointer' }} />
        </div>
      ))}
    </div>
  );
}
