// views/EditorView/CenterView.tsx
import { useAppSelector } from "@/redux/hooks";
import { materialComponentMap } from "@/config/dufaultStatues/componentMap";
import type {} from "@/types/editorStatusType";

export default function CenterView() {
  // 从 editor store 获取画布上的组件列表
  const comStatus = useAppSelector((state) => state.editor.comStatus);

  return (
    <div style={{ padding: "20px" }}>
      {comStatus.map((component, index) => {
        // 根据 type 获取对应的渲染组件
        const MaterialComponent = materialComponentMap[component.type];

        if (!MaterialComponent) {
          console.warn(`未知的组件类型: ${component.type}`);
          return null;
        }

        return (
          <div key={component.id} style={{ marginBottom: "20px" }}>
            <MaterialComponent status={component} />
          </div>
        );
      })}
    </div>
  );
}
