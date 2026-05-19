import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import type { ComponentStatus } from "@/types/schemaDiscript";
import EditorPanel from "@/components/SurveyCom/Editor/EditorPanel";
import { updateComponentStatus } from "@/redux/editorSlice";
import { useRef, useEffect } from "react";

export default function RightView() {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.editor.currentIndex);
  const comStatus: ComponentStatus[] = useAppSelector((state) => state.editor.comStatus);
  const currentComponent: ComponentStatus = comStatus[currentIndex];
  
  const renderCount = useRef(0);
  const componentRef = useRef(currentComponent);
  
  useEffect(() => {
    componentRef.current = currentComponent;
  });

  console.log('[埋点][RightView] 渲染次数:', ++renderCount.current);
  console.log('[埋点][RightView] 当前索引:', currentIndex);
  console.log('[埋点][RightView] 组件列表长度:', comStatus.length);
  console.log('[埋点][RightView] 当前组件是否存在:', !!currentComponent);
  console.log('[埋点][RightView] 当前组件是否变化:', componentRef.current !== currentComponent);
  if (currentComponent) {
    console.log('[埋点][RightView] 当前组件类型:', currentComponent.type);
    console.log('[埋点][RightView] 当前组件名称:', currentComponent.name);
  }

  const handleUpdate = (type: string, value: any) => {
    console.log('[埋点][RightView] handleUpdate 被调用, type:', type, 'value:', value);
    dispatch(updateComponentStatus({ type, value }));
  };

  const editorPanel = currentComponent ? (
    <EditorPanel status={currentComponent.status} onUpdate={handleUpdate} />
  ) : null;

  return (
    <div style={{ padding: "10px" }}>
      {editorPanel}
    </div>
  );
}
