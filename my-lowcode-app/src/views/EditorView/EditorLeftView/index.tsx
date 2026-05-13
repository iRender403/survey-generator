import { Link, Outlet } from "react-router-dom";
import { Col, Row } from "antd";
import { FileTextOutlined, ProfileOutlined } from "@ant-design/icons";

export default function index() {
  return (
    <Row style={{ height: '100%' }}>
      {/* 左侧图标导航 */}
      <Col 
        flex="60px"
        style={{ 
          borderRight: '1px solid #e8e8e8',
          padding: '16px 0'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* 题型 */}
          <Link 
            to="/editor/type" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1890ff'
            }}
          >
            <FileTextOutlined style={{ fontSize: 16, marginBottom: 4 }} />
            <span style={{ fontSize: 12 }}>题型</span>
          </Link>
          
          {/* 大纲 */}
          <Link 
            to="/editor/outline" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <ProfileOutlined style={{ fontSize: 16, marginBottom: 4 }} />
            <span style={{ fontSize: 12 }}>大纲</span>
          </Link>
        </div>
      </Col>
      
      {/* 右侧内容区 */}
      <Col flex="1" style={{ backgroundColor: '#fff' }}>
        <Outlet />
      </Col>
    </Row>
  );
}
