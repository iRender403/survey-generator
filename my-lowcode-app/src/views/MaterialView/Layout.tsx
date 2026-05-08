import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
export default function Layout({ children }) {
  const singleSelectStatues = useAppSelector(
    (state) => state.selectStatus.com['single-select'].status,
  );
  console.log(singleSelectStatues);
  return (
    <Row style={{ width: '100%' }}>
      {/* 左侧组件列表 */}
      <Col
        style={{
          width: '200px',
          padding: '20px',
          border: '1px solid #ebeef5',
          height: 'calc(100vh - 160px)',
          backgroundColor: '#fff',
          flexShrink: 0,
        }}
      >
        {children}
      </Col>

      {/* 中间业务组件预览 */}
      <Col
        flex="auto"
        style={{
          border: '1px solid #ebeef5',
          height: 'calc(100vh - 160px)',
          overflowY: 'auto',
          padding: '40px',
          backgroundColor: '#fff',
        }}
      >
          <Outlet context={{...singleSelectStatues,serialNum: 1}}/>
      </Col>

      {/* 右侧编辑面板 */}
      <Col
        style={{
          width: '350px',
          border: '1px solid #ebeef5',
          height: 'calc(100vh - 160px)',
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#fff',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>编辑面板</div>
        <div style={{ color: '#999' }}>编辑面板内容</div>
      </Col>
    </Row>
  );
}
