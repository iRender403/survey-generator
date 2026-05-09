import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import EditorPanel from '@/components/SurveyCom/Editor/EditorPanel';
import { useContext, useMemo } from 'react';

export default function Layout({ children }) {
  const singleSelectStatues = useAppSelector(
    (state) => state.selectStatus.com['single-select'].status,
  );
  const UpdateStatusContext: any = useContext(null!);
  function updateStatus(status: any) {
    UpdateStatusContext(status);
  } 
  const computedStatues = useMemo(() => {
    return {
      ...singleSelectStatues,
    };
  }, [singleSelectStatues]);

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
        <Outlet context={{ ...singleSelectStatues, serialNum: 1 }} />
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
        <UpdateStatusContext.Provider value={UpdateStatusContext}>
          <EditorPanel statues={singleSelectStatues} />
        </UpdateStatusContext.Provider>
      </Col>
    </Row>
  );
}
