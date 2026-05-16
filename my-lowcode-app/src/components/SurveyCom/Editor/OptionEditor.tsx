import { Button, Input } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';

interface OptionEditorProps {
  type: string;
  status: any;
  onUpdate?: (type: string, value: string[]) => void;
}

export default function OptionEditor(props: OptionEditorProps) {
  const { type, status, onUpdate } = props;
  const options = [...status.status];
  const updateStatus = useContext(UpdateStatusContext);

  const updateOptions = (newOptions: string[]) => {
    if (onUpdate) {
      onUpdate(type, newOptions);
    } else if (updateStatus) {
      updateStatus(type, newOptions);
    }
  };

  return (
    <div>
      {/* 标题和添加按钮*/}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>题目选项</span>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => updateOptions([...options, '新建选项'])}
          size="small"
        />
      </div>
      {/* 这里要做的事将option中的数据替换，在添加和修改的时候修改option中的状态 */}
      {/* 涉及这么几个问题:1.添加对应的选项 2. 删除对应的选项 3.修改对应的选项 */}
      {options.map((option, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <Input
            value={option}
            style={{ flex: 1, marginRight: 8 }}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              updateOptions(newOptions);
            }}
          />
          <MinusCircleOutlined
            onClick={() => updateOptions(options.filter((_, i) => i !== index))}
            style={{ color: '#ff4d4f', fontSize: 20, cursor: 'pointer' }}
          />
        </div>
      ))}
    </div>
  );
}
