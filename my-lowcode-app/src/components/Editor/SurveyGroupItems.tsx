// SurveyGroupItems.tsx
import type { EditorItem } from "@/types/editorStatusType";
import type { ComponentStatus } from "@/types/schemaDiscript";
import { Button } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { addComponentStatus } from "@/redux/editorSlice";
import { defaultStatusMap } from "@/config/dufaultStatues/defaultStatusMap";

type SurveyGroupItemsProps = {
  status: EditorItem;
};


export default function SurveyGroupItems(props: SurveyGroupItemsProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    // 1. 根据 materialName 获取默认状态生成函数
    const getDefaultStatus = defaultStatusMap[props.status.materialName];
    
    if (!getDefaultStatus) {
      console.error(`未知的组件类型: ${props.status.materialName}`);
      return;
    }
    
    // 2. 调用函数生成默认状态
    const componentStatus:ComponentStatus = getDefaultStatus();

    // 3. 添加到 editor store
    dispatch(addComponentStatus(componentStatus));

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