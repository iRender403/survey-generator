import type { SingleSelectStatus } from "@/config/dufaultStatues/SingleSelect";
import type { SinglePicSelectStatus } from "@/config/dufaultStatues/SinglePicSelect";
import type { MultiSelectStatus } from "@/config/dufaultStatues/MultiSelect";
import type { InputComponentStatus } from "@/config/dufaultStatues/Input";

// 组件状态的联合类型
export type ComponentStatus
    = SingleSelectStatus
    | SinglePicSelectStatus
    | MultiSelectStatus
    | InputComponentStatus;