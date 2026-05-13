import Header from "@/components/Common/Header";
import { Row, Col } from "antd";
import CenterView from "./CenterView";
import LeftView from "./EditorLeftView";
import RightView from "./RightView";

export default function EditorView() {
  return (
    <>
      <Header />
      <Row 
      justify="space-between" 
      style={{ padding: "20px", height: "100vh" }}
      
      >
        <Col
          style={{
            height: "100vh",
            border:"1px solid #eee"
          }}
          flex="0 0 300px"
        >
          <LeftView />
        </Col>
        <Col
          style={{
            height: "100vh",
            border:"1px solid #eee"
          }}
          flex="auto"
        >
          <CenterView />
        </Col>
        <Col
          style={{
            height: "100vh",
            border:"1px solid #eee"
          }}
          flex="0 0 250px"
        >
          <RightView />
        </Col>
      </Row>
    </>
  );
}
