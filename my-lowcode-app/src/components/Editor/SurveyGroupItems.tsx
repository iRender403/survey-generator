import type { EditorItem } from "@/types/editorStatus";
import { Button } from "antd";
type SurveyGroupItemsProps = {
  status: EditorItem;
};


export default function SurveyGroupItems(props: SurveyGroupItemsProps) {
  return <Button
    style={{
      width: "100%",
    }}
  >{props.status.ComName}</Button>;
}
