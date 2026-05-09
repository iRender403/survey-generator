import { useNavigate } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
export default function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };
  const containerStyle = {
    maxWidth: '1200px',
    marginTop: '20px',  
    margin: '0 auto', 
    padding: '0 20px',
    
  };
  const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';

  return (
      <div style={containerStyle}>
      <Row justify="space-between" align="middle">
        <Col>
          <Button icon={<ArrowLeftOutlined />} shape="circle" size="small" onClick={goHome} />
        </Col>
        <Col>
          <Avatar size={30} src={avatar} />
        </Col>
      </Row>
    </div>

  );
}
