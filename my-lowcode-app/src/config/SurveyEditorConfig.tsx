import { DashboardOutlined } from '@ant-design/icons';
import type { EditItemConfig } from '@/types/editorStatusType';

export default function SurveyEditorConfig():EditItemConfig[] {
  return [
    {
      title: '单选选项',
      icon: <DashboardOutlined />,
      list:[
        {materialName:"single-select",ComName:"单选题"},
        {materialName:"single-pic-select",ComName:"图片单选题"}
      ]
    },
  ]
}
