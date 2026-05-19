import { Row, Col } from "antd";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { createContext } from "react";
import { setTextStatue, setPicOptions, setOptions, setTitle, setContent } from "@/redux/schemaSlice";
import { useAppDispatch } from "@/redux/hooks";
import EditorPanel from "@/components/SurveyCom/Editor/EditorPanel";

import { useRef, useEffect } from "react";

type UpdateStatusType = (type: string, payload: string | number | object) => void;
const UpdateStatusContext = createContext<UpdateStatusType | null>(null);

export { UpdateStatusContext };

export default function Layout({ children }) {
  const singleSelectStatues = useAppSelector((state) => {
    const currentSelectStatus = state.selectStatus.currentSelectStatus;
    return state.selectStatus.com[currentSelectStatus]?.status;
  });

  const comRef = useRef(null);
  const renderCount = useRef(0);

  let isSame = comRef.current === singleSelectStatues;
  /**
   * 数据埋点
   */
  console.log({
    渲染次数: ++renderCount.current,
    上次数据: comRef.current,
    这次数据: singleSelectStatues,
    引用相同: isSame,
    渲染原因: isSame ? "父组件导致的" : "Redux数据变化导致的",
  });

  useEffect(() => {
    comRef.current = singleSelectStatues;
  });

  const dispatch = useAppDispatch();

  /**
   * 更新组件状态
   * @param type 组件类型
   * @param payload 更新数据
   */
  function updateStatus(type: string, payload: string | number | object) {
    console.log('[埋点] ========== Context updateStatus 被调用 ==========');
    console.log('[埋点] 更新类型:', type);
    console.log('[埋点] 更新数据:', payload);
    
    switch (type) {
      case "desc":
        console.log('[埋点] 派发 setTextStatue action');
        dispatch(setTextStatue(payload));
        break;
      case "picOptions":
        console.log('[埋点] 派发 setPicOptions action');
        dispatch(setPicOptions(payload));
        break;
      case "options":
        console.log('[埋点] 派发 setOptions action');
        dispatch(setOptions(payload));
        break;
      case "title":
        console.log('[埋点] 派发 setTitle action');
        dispatch(setTitle(payload));
        break;
      case "content":
        console.log('[埋点] 派发 setContent action');
        dispatch(setContent(payload));
        break;
      default:
        console.warn('[埋点] 未知的更新类型:', type);
        break;
    }
    console.log('[埋点] ========== Context updateStatus 调用结束 ==========');
  }

  return (
    <Row style={{ width: "100%" }}>
      {/* 左侧组件列表 */}
      <Col
        style={{
          width: "200px",
          padding: "20px",
          border: "1px solid #ebeef5",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        {children}
      </Col>

      {/* 中间业务组件预览 */}
      <Col
        flex="auto"
        style={{
          border: "1px solid #ebeef5",
          height: "calc(100vh - 160px)",
          flex: 1,
          overflowY: "auto",
          padding: "40px",
          backgroundColor: "#fff",
        }}
      >
        <Outlet context={{ ...singleSelectStatues, serialNum: 1 }} />
      </Col>

      {/* 右侧编辑面板 */}
      <Col
        style={{
          width: "350px",
          border: "1px solid #ebeef5",
          height: "calc(100vh - 160px)",
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <UpdateStatusContext.Provider value={updateStatus}>
          <EditorPanel status={singleSelectStatues} />
        </UpdateStatusContext.Provider>
      </Col>
    </Row>
  );
}
