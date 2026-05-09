import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import EditorView from '@/views/EditorView';
import MaterialView from '@/views/MaterialView';
import AdvancedGroupView from '@/views/MaterialView/AdvancedGroupView';
import InputGroupView from '@/views/MaterialView/InputGroupView';
import ContactGroupView from '@/views/MaterialView/ContactGroupView';
import SelectGropView from '@/views/MaterialView/SelectGropView';
import NoteGroupView from '@/views/MaterialView/NoteGroupView';
import PersonalInfoGroupView from '@/views/MaterialView/PersonalInfoGroupView';
import SinglePicSelect from '@/components/SurveyCom/Materials/SelectComs/SinglePicSelect';
import MultiPicSelect from '@/components/SurveyCom/Materials/SelectComs/MultiPicSelect';
import OptionSelect from '@/components/SurveyCom/Materials/SelectComs/OptionSelect';
import MultiSelect from '@/components/SurveyCom/Materials/SelectComs/MultiSelect';
import SingleSelect from '@/components/SurveyCom/Materials/SelectComs/SingleSelect.tsx';

import App from '@/App';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  // 编辑器
  {
    path: '/editor',
    element: <EditorView />,
  },
  // 组件市场 
  {
    path: '/material',
    element: <MaterialView />,

    children: [
      {
        index: true,
        element: <Navigate to="select" replace />,
      },
      // 高级选项
      {
        path: 'advanced',
        element: <AdvancedGroupView />,
      },
      // 输入框
      {
        path: 'input',
        element: <InputGroupView />,
      },
      // 联系人
      {
        path: 'contact',
        element: <ContactGroupView />,
      },
      // 选择框
      {
        path: 'select',
        element: <SelectGropView />,
        children: [
          {
            index: true,
            element: <Navigate to="single" replace />,
          },
          {
            path: 'single',
            element: <SingleSelect />,
          },
          {
            path: 'multi',
            element: <MultiSelect />,
          },
          {
            path: 'option',
            element: <OptionSelect />,
          },
          {
            path: 'singlepic',
            element: <SinglePicSelect />,
          },
          {
            path: 'multipic',
            element: <MultiPicSelect />,
          },
        ],
      },
      // 个人信息
      {
        path: 'personalinfo',
        element: <PersonalInfoGroupView />,
      },
      // 备注
      {
        path: 'note',
        element: <NoteGroupView />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
