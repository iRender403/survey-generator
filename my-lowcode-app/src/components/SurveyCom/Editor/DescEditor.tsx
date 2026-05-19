import { Input } from 'antd';
import { useContext, useRef, useEffect } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface DescEditorProps {
  type: string;
  status: any;
  onUpdate?: (type: string, value: string) => void;
}

export default function DescEditor(props: DescEditorProps) {
  const { type, onUpdate, status } = props;
  const updateStatus = useContext(UpdateStatusContext);
  const renderCount = useRef(0);
  const statusRef = useRef(status);
  
  useEffect(() => {
    statusRef.current = status;
  });
  
  console.log('[埋点][DescEditor] 渲染次数:', ++renderCount.current, 'type:', type);
  console.log('[埋点][DescEditor] 当前状态:', status?.status);
  console.log('[埋点][DescEditor] 状态是否变化:', statusRef.current !== status);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log('[埋点][DescEditor] handleChange 触发, 新值:', value);
    if (onUpdate) {
      console.log('[埋点][DescEditor] 使用 props.onUpdate 更新');
      onUpdate(type, value);
    } else if (updateStatus) {
      console.log('[埋点][DescEditor] 使用 Context.updateStatus 更新');
      updateStatus(type, value);
    } else {
      console.warn('[埋点][DescEditor] 警告: 没有可用的更新方法');
    }
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>描述内容</label>
      <Input.TextArea placeholder="请输入描述" rows={3} onChange={handleChange} />
    </div>
  );
}
