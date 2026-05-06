import { Link, Outlet } from 'react-router-dom'
import { CheckCircleOutlined, EditOutlined, FileTextOutlined, MessageOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import Header from "@/components/Common/Header"
import "./index.scss"

export default function index() {
  return (
    <>
      <Header />

      <h1 className="font-weight-100 text-center m0 p0">组件市场</h1>
      <div className="container mc flex">
        {/* 导航 */}
        <nav className="category mc">
          <Link className="category-item" to="/material/select">
            <CheckCircleOutlined />
            <div>选择</div>
          </Link>
          <Link className="category-item" to="/material/input">
            <EditOutlined />
            <div>文本输入</div>
          </Link>
          <Link className="category-item" to="/material/advanced">
            <FileTextOutlined />
            <div>高级题型</div>
          </Link>
          <Link className="category-item" to="/material/note">
            <MessageOutlined />
            <div>备注说明</div>
          </Link>
          <Link className="category-item" to="/material/personalinfo">
            <UserOutlined />
            <div>个人信息</div>
          </Link>
          <Link className="category-item" to="/material/contact">
            <MailOutlined />
            <div>联系方式</div>
          </Link>
        </nav>
        {/* 路由出口 */}
        <div className="coms">
          <Outlet />
        </div>
      </div>
    </>
  )
}
