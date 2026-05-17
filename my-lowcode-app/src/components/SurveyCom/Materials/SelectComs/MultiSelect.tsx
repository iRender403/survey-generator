import MaterialHeader from "../../Common/MaterialsHeader";
import { useOutletContext } from "react-router-dom";
import { getTextStatus, getStringStatus, getCurrentStatus, getStringStatusByCurrentStatus } from "@/utils";
import { useState } from "react";
import { Checkbox } from "antd";
import type { OptionsStatus } from "@/types/editPropsType";

interface MultiSelectProps {
  status?: (OptionsStatus & number) | OptionsStatus;
}

export default function MultiSelect(props: MultiSelectProps) {
  const outletContext = useOutletContext() as Partial<OptionsStatus>;
  const multiSelectStatues = props.status || outletContext;
  const [value, setValue] = useState<number[]>([]);

  // 如果状态未加载，显示加载中或返回 null
  if (!multiSelectStatues || !multiSelectStatues.title) {
    return <div>加载中...</div>;
  }

  const computedState = {
    title: getTextStatus(multiSelectStatues.title),
    desc: getTextStatus(multiSelectStatues.desc),
    options: getStringStatus(multiSelectStatues.options),
    position: getCurrentStatus(multiSelectStatues.position),
    titleSize: getStringStatusByCurrentStatus(multiSelectStatues.titleSize),
    descSize: getStringStatusByCurrentStatus(multiSelectStatues.descSize),
    titleWeight: getCurrentStatus(multiSelectStatues.titleWeight),
    descWeight: getCurrentStatus(multiSelectStatues.descWeight),
    titleItalic: getCurrentStatus(multiSelectStatues.titleItalic),
    descItalic: getCurrentStatus(multiSelectStatues.descItalic),
    titleColor: getTextStatus(multiSelectStatues.titleColor),
    descColor: getTextStatus(multiSelectStatues.descColor),
  };

  const handleChange = (checkedValues: number[]) => {
    setValue(checkedValues);
  };

  return (
    <>
      <MaterialHeader {...computedState} />
      <div style={{ paddingTop: "10px" }}>
        <Checkbox.Group onChange={handleChange} value={value}>
          {computedState.options.map((Item, index) => {
            return (
              <Checkbox key={index} value={index}>
                {typeof Item === "string" ? Item : JSON.stringify(Item)}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </div>
    </>
  );
}
