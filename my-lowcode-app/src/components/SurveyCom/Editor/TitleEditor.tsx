import { Input } from 'antd';
import { useContext, useRef, useEffect } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface TitleEditorProps {
  type: string;
  status: any;
  onUpdate?: (type: string, value: string) => void;
}

export default function TitleEditor(props: TitleEditorProps) {
  const { type, onUpdate, status } = props;
  const updateStatus = useContext(UpdateStatusContext);
  const renderCount = useRef(0);
  const statusRef = useRef(status);
  
  useEffect(() => {
    statusRef.current = status;
  });
  
  console.log('[埋点][TitleEditor] 渲染次数:', ++renderCount.current, 'type:', type);
  console.log('[埋点][TitleEditor] 当前状态:', status?.status);
  console.log('[埋点][TitleEditor] 状态是否变化:', statusRef.current !== status);
  console.log('[埋点][TitleEditor] onUpdate 是否存在:', !!onUpdate);
  console.log('[埋点][TitleEditor] updateStatus Context 是否存在:', !!updateStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('[埋点][TitleEditor] handleChange 触发, 新值:', value);
    if (onUpdate) {
      console.log('[埋点][TitleEditor] 使用 props.onUpdate 更新');
      onUpdate(type, value);
    } else if (updateStatus) {
      console.log('[埋点][TitleEditor] 使用 Context.updateStatus 更新');
      updateStatus(type, value);
    } else {
      console.warn('[埋点][TitleEditor] 警告: 没有可用的更新方法');
    }
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px' }}>标题</label>
      <Input placeholder="请输入标题" onChange={handleChange} />
    </div>
  );
}
