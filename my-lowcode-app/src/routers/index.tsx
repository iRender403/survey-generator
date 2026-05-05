import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import EditorView from '@/views/EditorView';
import MaterialView from '@/views/MaterialView';
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
  },
];

export const router = createBrowserRouter(routes);