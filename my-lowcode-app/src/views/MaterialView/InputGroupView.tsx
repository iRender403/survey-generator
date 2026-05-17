import Layout from "./Layout";
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";

export default function InputGroupView() {
  const items = [
    {
      to: "/material/input",
      name: "输入框",
    },
  ];

  return (
    <Layout>
      <Row gutter={[12, 12]}>
        {items.map((item) => (
          <Col span={12} key={item.to}>
            <NavLink
              to={item.to}
              style={({ isActive }) => ({
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "4px 0",
                borderRadius: "var(--border-radius-base)",
                backgroundColor: isActive ? "var(--primary-color)" : "var(--info-color)",
                color: "#fff",
              })}
            >
              {item.name}
            </NavLink>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
