import type { SingleSelectStatus } from "@/config/dufaultStatues/SingleSelect";
import type { SinglePicSelectStatus } from "@/config/dufaultStatues/SinglePicSelect";

// 组件状态的联合类型
export type ComponentStatus = SingleSelectStatus | SinglePicSelectStatus;