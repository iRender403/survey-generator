import { useNavigate } from "react-router-dom";
import { Button, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
export default function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const containerStyle = {
    maxWidth: "1600px",
    marginTop: "20px",
    margin: "0 auto",
    padding: "0 20px",
  };
  const avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";

  return (
    <div style={{...containerStyle,borderBottom:'1px solid #e8e8e8'}}>
      <Row justify="space-between" align="middle">
        <Col>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              border: "1px solid #e8e8e8",
            }}
          >
            <Button icon={<ArrowLeftOutlined />} shape="circle" size="small" onClick={goHome} />
          </div>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              border: "1px solid #e8e8e8",
            }}
          >
            <Avatar size={30} src={avatar} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
