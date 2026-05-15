// views/EditorView/CenterView.tsx
import { useAppSelector } from "@/redux/hooks";
import { materialComponentMap } from "@/config/dufaultStatues/componentMap";
import { setCurrentIndex } from "@/redux/editorSlice";
import type { ComponentStatus } from "@/types/schemaDiscript";
import { useAppDispatch } from "@/redux/hooks";

export default function CenterView() {
  const dispatch = useAppDispatch();
  // 从 editor store 获取画布上的组件列表
  const comStatus: ComponentStatus[] = useAppSelector((state) => state.editor.comStatus);

  // 修改编辑器画布中当前选中的组件索引
  function clickHanle(index: number) {
    dispatch(setCurrentIndex(index));
  }

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
          <div key={component.id} onClick={() => clickHanle(index)} className="component-container" style={{ marginBottom: "20px" }}>
            <MaterialComponent status={component.status} />
          </div>
        );
      })}
    </div>
  );
}
