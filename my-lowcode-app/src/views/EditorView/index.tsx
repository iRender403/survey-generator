import Header from "@/components/Common/Header";
import { Row, Col } from "antd";
import CenterView from "./CenterView";
import LeftView from "./EditorLeftView";
import RightView from "./RightView";

export default function EditorView() {
  return (
    <div style={{ height: "calc(100vh - 50px)", marginBottom: "20px" }}>
      <Header />
      <Row justify="space-between" style={{ padding: "20px", height: "100%" }}>
        <Col
          style={{
            height: "100%",
            border: "1px solid #eee",
          }}
          flex="0 0 300px"
        >
          <LeftView />
        </Col>
        <Col
          style={{
            height: "100%",
            border: "1px solid #eee",
            overflow: "auto",
          }}
          flex="auto"
        >
          <CenterView />
        </Col>
        <Col
          style={{
            height: "100%",
            border: "1px solid #eee",
            overflow: "auto",
          }}
          flex="0 0 350px"
        >
          <RightView />
        </Col>
      </Row>
    </div>
  );
}
