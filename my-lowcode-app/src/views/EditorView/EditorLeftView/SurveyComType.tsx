import editorType from "@/config/SurveyEditorConfig";
import SurveyGroupCom from "@/components/Editor/SurveyGroupCom";
import type { EditItemConfig } from "@/types/editorStatus";

export default function SurveyComType() {
    const editorName:EditItemConfig[] = editorType();
    return <div>{
        editorName.map((item,key) => (
            <SurveyGroupCom key={key} status={item} />
        ))
    }</div>;
}
