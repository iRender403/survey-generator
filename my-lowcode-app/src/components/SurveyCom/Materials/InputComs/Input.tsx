import MaterialHeader from "../../Common/MaterialsHeader";
import { useOutletContext } from "react-router-dom";
import { getTextStatus, getCurrentStatus, getStringStatusByCurrentStatus } from "@/utils";
import { Input as AntInput } from "antd";
import type { InputStatus } from "@/types/editPropsType";
import { useAppDispatch } from "@/redux/hooks";
import { setContent } from "@/redux/schemaSlice";

interface InputProps {
  status?: InputStatus;
}

export default function Input(props: InputProps) {
  const outletContext: InputStatus = useOutletContext();
  const inputStatus: InputStatus = props.status || outletContext;
  const dispatch = useAppDispatch();
  
  if (!inputStatus || !inputStatus.title) {
    return <div>加载中...</div>;
  }

  const computedState = {
    title: getTextStatus(inputStatus.title),
    desc: getTextStatus(inputStatus.desc),
    content: getTextStatus(inputStatus.content),
    position: getCurrentStatus(inputStatus.position),
    titleSize: getStringStatusByCurrentStatus(inputStatus.titleSize),
    descSize: getStringStatusByCurrentStatus(inputStatus.descSize),
    titleWeight: getCurrentStatus(inputStatus.titleWeight),
    descWeight: getCurrentStatus(inputStatus.descWeight),
    titleItalic: getCurrentStatus(inputStatus.titleItalic),
    descItalic: getCurrentStatus(inputStatus.descItalic),
    titleColor: getTextStatus(inputStatus.titleColor),
    descColor: getTextStatus(inputStatus.descColor),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContent(e.target.value));
  };

  return (
    <>
      <MaterialHeader {...computedState} />
      <div style={{ paddingTop: "10px" }}>
        <AntInput placeholder={computedState.content} onChange={handleChange} style={{ width: "100%" }} />
      </div>
    </>
  );
}
