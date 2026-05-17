import { v4 as uuidv4 } from 'uuid';
import type { MaterialType } from '@/config/dufaultStatues/componentMap';
import type { OptionsStatus } from '@/types/editPropsType';

export interface MultiSelectStatus {
  type: MaterialType;
  name: string;
  id: string;
  status: OptionsStatus;
}

export default function createMultiSelectStatus(): MultiSelectStatus {
  return {
    type: 'multi-select',
    name: 'multi-select',
    id: uuidv4(),
    status: {
      title: {
        id: uuidv4(),
        status: '多选题默认标题',
        isShow: true,
        name: 'title-editor',
      },
      desc: {
        id: uuidv4(),
        status: '多选题默认描述',
        isShow: true,
        name: 'desc-editor',
      },
      options: {
        id: uuidv4(),
        status: ['默认选项1', '默认选项2', '默认选项3'],
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['左对齐', '居中对齐'],
        isShow: true,
        name: 'position-editor',
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['22', '20', '18'],
        isShow: true,
        name: 'size-editor',
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ['16', '14', '12'],
        isShow: true,
        name: 'size-editor',
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['加粗', '正常'],
        isShow: true,
        name: 'weight-editor',
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ['斜体', '正常'],
        isShow: true,
        name: 'italic-editor',
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        name: 'color-editor',
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        name: 'color-editor',
      },
    },
  };
}
