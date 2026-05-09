import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import EditorPanel from '@/components/SurveyCom/Editor/EditorPanel';
import { createContext } from 'react';
import { setTextStatue } from '@/redux/slices/schemaSlice';
import { useAppDispatch } from '@/redux/hooks';

type UpdateStatusType = (type: string, payload: string | number | object) => void;
const UpdateStatusContext = createContext<UpdateStatusType | null>(null);

export { UpdateStatusContext };

export default function Layout({ children }) {
  const singleSelectStatues = useAppSelector(
    (state) => state.selectStatus.com['single-select'].status,
  );
  const dispatch = useAppDispatch();

  function updateStatus(type: string, payload: string | number | object) {
    switch (type) {
      case 'desc':
        dispatch(setTextStatue(payload));
        break;
      default:
        break;
    }
  }

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
        <UpdateStatusContext.Provider value={updateStatus}>
          <EditorPanel statues={singleSelectStatues} />
        </UpdateStatusContext.Provider>
      </Col>
    </Row>
  );
}
