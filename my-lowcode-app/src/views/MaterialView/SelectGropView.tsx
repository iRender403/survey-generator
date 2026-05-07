import { Row, Col } from 'antd';
import Layout from './Layout';

export default function SelectGropView() {
  const items = ['单选题', '多选题', '下拉选择题', '图片单选题', '图片多选题'];

  const tagStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'block',
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    border: isActive ? 'none' : '1px solid #e4e7ed',
    backgroundColor: isActive ? '#909399' : '#f5f7fa',
    color: isActive ? '#fff' : '#606266',
    textAlign: 'center',
  });

  return (
    <Layout>
      <Row gutter={[12, 12]}>
        {items.map((item, index) => (
          <Col span={12} key={item}>
            <div style={tagStyle(index === 0)}>
              {item}
            </div>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
