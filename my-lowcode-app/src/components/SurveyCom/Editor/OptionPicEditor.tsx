import { useContext, useState } from 'react';
import { Input, Button, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { UpdateStatusContext } from '@/views/MaterialView/Layout';
import type { UploadProps } from 'antd';

interface PicOption {
  picTitle: string;
  picDesc: string;
  value: string;
}

interface OptionPicEditorProps {
  type: string;
  status: {
    status: PicOption[];
  };
  onUpdate?: (type: string, value: PicOption[]) => void;
}

export default function OptionPicEditor(props: OptionPicEditorProps) {
  const { type, status, onUpdate } = props;
  const options = status.status;
  const updateStatus = useContext(UpdateStatusContext);

  const [localOptions, setLocalOptions] = useState<PicOption[]>(options);

  const handleUpdateOptions = (newOptions: PicOption[]) => {
    setLocalOptions(newOptions);
    if (onUpdate) {
      onUpdate(type, newOptions);
    } else if (updateStatus) {
      updateStatus(type, newOptions);
    }
  };

  const handleTitleChange = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = { ...newOptions[index], picTitle: value };
    handleUpdateOptions(newOptions);
  };

  const handleDescChange = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = { ...newOptions[index], picDesc: value };
    handleUpdateOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [
      ...localOptions,
      {
        picTitle: `图片标题${localOptions.length + 1}`,
        picDesc: '',
        value: '',
      },
    ];
    handleUpdateOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (localOptions.length <= 2) {
      message.warning('至少保留2个图片选项');
      return;
    }
    const newOptions = localOptions.filter((_, i) => i !== index);
    handleUpdateOptions(newOptions);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>题目选项</span>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" onClick={handleAddOption} />
      </div>

      {localOptions.map((option, index) => (
        <div key={index} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: '#333' }}>选项{index + 1}</span>
            <MinusCircleOutlined
              style={{ color: '#ff4d4f', fontSize: 18, marginLeft: 8, cursor: 'pointer' }}
              onClick={() => handleRemoveOption(index)}
            />
          </div>

          <Input
            placeholder="图片标题"
            value={option.picTitle}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            style={{ marginBottom: 8 }}
          />

          <Input.TextArea
            placeholder="说明（选填，限30字）"
            value={option.picDesc}
            onChange={(e) => handleDescChange(index, e.target.value)}
            maxLength={30}
            showCount
            rows={2}
          />
        </div>
      ))}
    </div>
  );
}
