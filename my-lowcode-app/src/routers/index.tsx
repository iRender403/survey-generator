import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import EditorView from '@/views/EditorView';
import MaterialView from '@/views/MaterialView/Index';
import AdvancedGroupView from '@/views/MaterialView/AdvancedGroupView';
import InputGroupView from '@/views/MaterialView/InputGroupView';
import ContactGroupView from '@/views/MaterialView/ContactGroupView';
import SelectGropView from '@/views/MaterialView/SelectGropView';
import NoteGroupView from '@/views/MaterialView/NoteGroupView';
import PersonalInfoGroupView from '@/views/MaterialView/PersonalInfoGroupView';



import App from '@/App';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />, 
  },
  {
    path: '/editor',
    element: <EditorView />, // 预览页面
  },
  {
    path: '/material',
    element: <MaterialView />,
    children: [
      {
        path: 'advanced',
        element: <AdvancedGroupView />,
      },
      {
        path: 'input',
        element: <InputGroupView />,
      },
      {
        path: 'contact',
        element: <ContactGroupView />,
      },
      {
        path: 'select',
        element: <SelectGropView />,
      },
      {
        path: 'note',
        element: <NoteGroupView />,
      },
      {
        path: 'personalinfo',
        element: <PersonalInfoGroupView />,
      },
    ]
  }
]

export default createBrowserRouter(routes);