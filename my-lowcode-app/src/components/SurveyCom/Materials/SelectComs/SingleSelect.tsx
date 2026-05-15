import MaterialHeader from "../../Common/MaterialsHeader";
import { useOutletContext } from "react-router-dom";
import { getTextStatus, getStringStatus, getCurrentStatus, getStringStatusByCurrentStatus } from "@/utils";
import { useMemo, useState } from "react";
import { Radio } from "antd";
import type { OptionsStatus } from "@/types/editPropsType";

export default function SigleSelect(props: { status: (OptionsStatus & number) | OptionsStatus }) {
  const singleSelectStatues: (OptionsStatus & number) | OptionsStatus = props.status || useOutletContext();
  const [value, setValue] = useState(0);

  const computedState = useMemo(
    () => ({
      title: getTextStatus(singleSelectStatues.title),
      desc: getTextStatus(singleSelectStatues.desc),
      options: getStringStatus(singleSelectStatues.options),
      position: getCurrentStatus(singleSelectStatues.position),
      titleSize: getStringStatusByCurrentStatus(singleSelectStatues.titleSize),
      descSize: getStringStatusByCurrentStatus(singleSelectStatues.descSize),
      titleWeight: getCurrentStatus(singleSelectStatues.titleWeight),
      descWeight: getCurrentStatus(singleSelectStatues.descWeight),
      titleItalic: getCurrentStatus(singleSelectStatues.titleItalic),
      descItalic: getCurrentStatus(singleSelectStatues.descItalic),
      titleColor: getTextStatus(singleSelectStatues.titleColor),
      descColor: getTextStatus(singleSelectStatues.descColor),
    }),
    [singleSelectStatues]
  );

  return (
    <>
      <MaterialHeader {...computedState} />
      <div style={{ paddingTop: "10px" }}>
        <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
          {computedState.options.map((Item, index) => {
            return (
              <Radio key={index} value={Item}>
                {typeof Item === "string" ? Item : JSON.stringify(Item)}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
    </>
  );
}
