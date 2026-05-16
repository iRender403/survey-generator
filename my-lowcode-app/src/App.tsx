import { Button, Table, Space, Typography, Row, Col } from "antd";
import { PlusOutlined, AppstoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import "./assets/css/common.scss";

const { Title } = Typography;

interface SurveyData {
  key: string;
  createDate: string;
  title: string;
  questionCount: number;
  updateDate: string;
}

const columns: ColumnsType<SurveyData> = [
  {
    title: "创建日期",
    dataIndex: "createDate",
    key: "createDate",
    width: 150,
  },
  {
    title: "问卷标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "题目数",
    dataIndex: "questionCount",
    key: "questionCount",
    width: 100,
    align: "center",
  },
  {
    title: "最近更新日期",
    dataIndex: "updateDate",
    key: "updateDate",
    width: 150,
  },
  {
    title: "操作",
    key: "action",
    width: 200,
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" icon={<EyeOutlined />} size="small">
          查看问卷
        </Button>
        <Button type="link" icon={<EditOutlined />} size="small">
          编辑
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />} size="small">
          删除
        </Button>
      </Space>
    ),
  },
];

const data: SurveyData[] = [
  {
    key: "1",
    createDate: "2026/05/04\n15:25:20",
    title: "test",
    questionCount: 8,
    updateDate: "2026/05/04\n15:25:20",
  },
];

export default function App() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        问卷生成系统
      </Title>

      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/editor")} style={{ marginRight: "8px" }}>
          创建问卷
        </Button>
        <Button icon={<AppstoreOutlined />} onClick={() => navigate("/material")}>
          组件市场
        </Button>
      </div>

      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </div>
  );
}
