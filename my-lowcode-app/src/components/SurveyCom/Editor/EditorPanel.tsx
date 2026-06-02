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
  
  return (
    <>
      {visibleEditors.map(([key, value]) => {
        const editorName = (value as any).name as keyof typeof editorComponentMap;
        const Component = editorComponentMap[editorName];
        return Component ? <Component key={key} type={key} status={value} onUpdate={onUpdate} /> : null;
      })}
    </>
  );
}
