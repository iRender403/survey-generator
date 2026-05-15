import { editorComponentMap } from '@/config/dufaultStatues/componentMap';
import type { OptionsStatus, BaseStatus } from "@/types/editPropsType";

export default function EditorPanel({ status }: { status: OptionsStatus | BaseStatus }) {
  return (
    <>
      {Object.entries(status).map(([key, value]) => {
        if (!(value as any).isShow) {
          return null;
        }
        const editorName = (value as any).name as keyof typeof editorComponentMap;
        const Component = editorComponentMap[editorName];
        return Component ? <Component key={key} type={key} status={value} /> : null;
      })}
    </>
  );
}
