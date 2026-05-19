// SurveyGroupItems.tsx
import type { EditorItem } from "@/types/editorStatusType";
import type { ComponentStatus } from "@/types/schemaDiscript";
import { Button } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { addComponentStatus } from "@/redux/editorSlice";
import { defaultStatusMap } from "@/config/dufaultStatues/defaultStatusMap";
import { materialTracer } from "@/utils/trace";

type SurveyGroupItemsProps = {
  status: EditorItem;
};


export default function SurveyGroupItems(props: SurveyGroupItemsProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    // 使用追踪系统记录组件市场点击流程
    materialTracer.log('组件按钮被点击', {
      materialName: props.status.materialName,
      comName: props.status.ComName,
    });
    
    // 1. 根据 materialName 获取默认状态生成函数
    const getDefaultStatus = defaultStatusMap[props.status.materialName];
    
    if (!getDefaultStatus) {
      materialTracer.error('未知的组件类型', { materialName: props.status.materialName });
      return;
    }
    
    // 2. 调用函数生成默认状态
    const componentStatus:ComponentStatus = getDefaultStatus();
    // 数据跟踪
    materialTracer.log('生成组件状态', { 
      type: componentStatus.type,
      name: componentStatus.name,
      id: componentStatus.id,
    });

    // 3. 添加到 editor store
    materialTracer.log('派发 addComponentStatus action');
    dispatch(addComponentStatus(componentStatus));
    materialTracer.log('组件添加完成');
  }

  return (
    <Button
      style={{ width: "100%" }}
      onClick={handleClick}
    >
      {props.status.ComName}
    </Button>
  );
}