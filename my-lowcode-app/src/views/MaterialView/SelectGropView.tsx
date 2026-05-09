import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import Layout from './Layout';
import '@/assets/css/variables.scss';

export default function SelectGropView() {
  const items = [
    {
      to: '/material/select/single',
      name: '单选题',
    },
    {
      to: '/material/select/multi',
      name: '多选题',
    },
    {
      to: '/material/select/option',
      name: '下拉选择题',
    },
    {
      to: '/material/select/singlepic',
      name: '图片单选题',
    },
    {
      to: '/material/select/multipic',
      name: '图片多选题',
    },
  ];

  return (
    <Layout>
      <Row gutter={[12, 12]}>
        {items.map((item) => (
          <Col span={12} key={item.to}>
            <NavLink
              to={item.to}
              style={({isActive})=>({
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '4px 0',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: isActive?'var(--primary-color)':'var(--info-color)',
                color: '#fff',
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
