import type { EditItemConfig } from "@/types/editorStatus";
import SurveyGroupItems from "@/components/Editor/SurveyGroupItems";
import { Col, Row ,Space} from "antd";

type SurveyGroupComProps = {
  status: EditItemConfig;
};

export default function SurveyGroupCom(props: SurveyGroupComProps) {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Space vertical size={16}>
      <Row justify="start">
        <Col>
            {props.status.icon}
            {props.status.title}
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={16}>
        {/* 组件标题 */}
        {props.status.list.map((item, key) => (
          <Col  key={key} span={12}>
              <SurveyGroupItems status={item} />
          </Col>
        ))}
      </Row>
      </Space>
    </div>
  );
}
