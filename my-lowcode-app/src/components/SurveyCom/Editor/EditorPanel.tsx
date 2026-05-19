import { editorComponentMap } from '@/config/dufaultStatues/componentMap';
import type { OptionsStatus, BaseStatus } from "@/types/editPropsType";
import { useRef, useEffect } from 'react';

interface EditorPanelProps {
  status: OptionsStatus | BaseStatus;
  onUpdate?: (type: string, value: any) => void;
}

export default function EditorPanel({ status, onUpdate }: EditorPanelProps) {
  const renderCount = useRef(0);
  const statusRef = useRef(status);
  
  useEffect(() => {
    statusRef.current = status;
  });
  
  const visibleEditors = Object.entries(status).filter(([_, value]) => (value as any).isShow);
  
  console.log('[埋点][EditorPanel] 渲染次数:', ++renderCount.current);
  console.log('[埋点][EditorPanel] 当前状态 keys:', Object.keys(status));
  console.log('[埋点][EditorPanel] 可见编辑器数量:', visibleEditors.length);
  console.log('[埋点][EditorPanel] 状态是否变化:', statusRef.current !== status);

  return (
    <>
      {visibleEditors.map(([key, value]) => {
        const editorName = (value as any).name as keyof typeof editorComponentMap;
        const Component = editorComponentMap[editorName];
        console.log('[埋点][EditorPanel] 渲染编辑器:', key, '类型:', editorName);
        return Component ? <Component key={key} type={key} status={value} onUpdate={onUpdate} /> : null;
      })}
    </>
  );
}
