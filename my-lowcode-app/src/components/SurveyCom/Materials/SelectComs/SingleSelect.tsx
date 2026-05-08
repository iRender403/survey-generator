import MaterialHeader from "../../Common/MaterialsHeader"
import { useOutletContext } from "react-router-dom";
import { getTextStatus,getStringStatus,getCurrentStatus,getStringStatusByCurrentStatus } from "@/utils"
import { useMemo } from "react";
import type { OptionsStatus } from "@/types/editProps";

export default function SigleSelect() {
  const singleSelectStatues:(OptionsStatus&number) = useOutletContext();
  const computedState = useMemo(() => ({
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
   }) ,[singleSelectStatues])
   return (
    <>
        <MaterialHeader {...computedState} />
    </>
  )
}
