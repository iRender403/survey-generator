import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import type { ComponentStatus } from "@/types/schemaDiscript";
import EditorPanel from "@/components/SurveyCom/Editor/EditorPanel";
import { updateComponentStatus } from "@/redux/editorSlice";

export default function RightView() {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.editor.currentIndex);
  const comStatus: ComponentStatus[] = useAppSelector((state) => state.editor.comStatus);
  const currentComponent: ComponentStatus = comStatus[currentIndex];

  const handleUpdate = (type: string, value: any) => {
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
