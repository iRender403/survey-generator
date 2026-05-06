import { useNavigate } from "react-router-dom";
import { Button,Avatar } from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons"
import '@/assets/css/common.scss';
export default function Header() {
 const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';

  return (
    <div className="header-container flex align-items-center border-box">
      <div className="header-left flex justify-content-center align-items-center">
        <Button 
          icon={<ArrowLeftOutlined />} 
          shape="circle" 
          size="small" 
          onClick={goHome} 
        />
      </div>
      <div className="header-center flex align-items-center space-between pl-15 pr-15"></div>
      <div className="header-right flex justify-content-center align-items-center">
        <Avatar size={30} src={avatar} />
      </div>
    </div>
  );
}
