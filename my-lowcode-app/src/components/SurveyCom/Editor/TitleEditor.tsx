import { Input } from 'antd';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

export default function TitleEditor(props) {
  const type = props.type;
  const updateStatus: any = useContext(UpdateStatusContext);
  function updateTitle(newTitle: string) {
    updateStatus(type, newTitle);
  }
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>{'标题'}</label>
      <Input placeholder="请输入标题" onChange={(e) => updateTitle(e.target.value)} />
    </div>
  );
}
