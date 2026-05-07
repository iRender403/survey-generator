import { Link, Outlet } from 'react-router-dom';
import {
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Header from '@/components/Common/Header';
import '@/assets/css/index.scss';

const navItems = [
  {
    to: '/material/select',
    icon: <CheckCircleOutlined />,
    label: '选择',
    color: `var(--primary-color)`,
  },
  {
    to: '/material/input',
    icon: <EditOutlined />,
    label: '文本输入',
    color: `var(--success-color)`,
  },
  {
    to: '/material/advanced',
    icon: <FileTextOutlined />,
    label: '高级题型',
    color: `var(--warning-color)`,
  },
  {
    to: '/material/note',
    icon: <MessageOutlined />,
    label: '备注说明',
    color: `var(--error-color)`,
  },
  {
    to: '/material/personalinfo',
    icon: <UserOutlined />,
    label: '个人信息',
    color: `var(--info-color)`,
  },
  {
    to: '/material/contact',
    icon: <MailOutlined />,
    label: '联系方式',
    color: `var(--font-color-light)`,
  },
];

export default function index() {
  return (
    <>
      <Header />
      <h1 style={{ fontWeight: 100, textAlign: 'center', margin: 0, padding: '20px' }}>组件市场</h1>
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0px' }}>
        {/* 导航 */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100px',
            flexShrink: 0,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                borderTopLeftRadius: 'var(--border-radius-lg)',
                borderBottomLeftRadius: 'var(--border-radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px 10px',
                color:"#eee",
                textDecoration: 'none',
                transition: 'all 0.3s',
                cursor: 'pointer',
                backgroundColor: item.color,
              }}
            >
              {item.icon}
              <div style={{ fontSize: '12px', marginTop: '8px' }}>{item.label}</div>
            </Link>
          ))}
        </nav>
        {/* 路由出口 */}
        <div style={{ flex: 1, backgroundColor: 'var(--white-color)', height: '100%', minHeight: '1500px' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
