import { useAppSelector } from "@/redux/hooks";
import type { ComponentStatus } from "@/types/schemaDiscript";
import EditorPanel from "@/components/SurveyCom/Editor/EditorPanel";

export default function RightView() {
  const currentIndex = useAppSelector((state) => state.editor.currentIndex);
  const comStatus: ComponentStatus[] = useAppSelector((state) => state.editor.comStatus);
  const currentComponent: ComponentStatus = comStatus[currentIndex];
  const editorPanel = currentComponent? <EditorPanel status={currentComponent.status} /> : null;
  return(
    <div style={{ padding: "10px" }}>
      {editorPanel}
    </div>
  )
 
}
