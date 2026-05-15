import { v4 as uuidv4 } from 'uuid';
import type { MaterialType, EditorType } from '@/config/dufaultStatues/componentMap';

const defaultStatus = {
  type: 'single-select' as MaterialType,
  name: 'single-select',
  id: uuidv4(),
  status: {
    title: {
      id: uuidv4(),
      status: '图片单选默认标题',
      isShow: true,
      name: 'title-editor' as EditorType,
    },
    desc: {
      id: uuidv4(),
      status: '图片单选默认标题',
      isShow: true,
      name: 'desc-editor' as EditorType,
    },
    options: {
      id: uuidv4(),
      status: [
        {
          picTitle: '图片标题1',
          picDesc: '图片描述1',
          value: '',
        },
        {
          picTitle: '图片标题2',
          picDesc: '图片描述2',
          value: '',
        },
      ],
      currentStatus: 0,
      isShow: true,
      name: 'options-pic-editor' as EditorType,
    },
    position: {
      id: uuidv4(),
      currentStatus: 0,
      status: ['左对齐', '居中对齐'],
      isShow: true,
      name: 'position-editor' as EditorType,
    },
    titleSize: {
      id: uuidv4(),
      currentStatus: 0,
      status: ['22', '20', '18'],
      isShow: true,
      name: 'size-editor' as EditorType,
    },
    descSize: {
      id: uuidv4(),
      currentStatus: 0,
      status: ['16', '14', '12'],
      isShow: true,
      name: 'size-editor' as EditorType,
    },
    titleWeight: {
      id: uuidv4(),
      currentStatus: 1,
      status: ['加粗', '正常'],
      isShow: true,
      name: 'weight-editor' as EditorType,
    },
    descWeight: {
      id: uuidv4(),
      currentStatus: 1,
      status: ['加粗', '正常'],
      isShow: true,
      name: 'weight-editor' as EditorType,
    },
    titleItalic: {
      id: uuidv4(),
      currentStatus: 1,
      status: ['斜体', '正常'],
      isShow: true,
      name: 'italic-editor' as EditorType,
    },
    descItalic: {
      id: uuidv4(),
      currentStatus: 1,
      status: ['斜体', '正常'],
      isShow: true,
      name: 'italic-editor' as EditorType,
    },
    titleColor: {
      id: uuidv4(),
      status: '#000',
      isShow: true,
      name: 'color-editor' as EditorType,
    },
    descColor: {
      id: uuidv4(),
      status: '#909399',
      isShow: true,
      name: 'color-editor' as EditorType,
    },
  },
};

export default function () {
  return defaultStatus
}

export type SinglePicSelectStatus = typeof defaultStatus;
