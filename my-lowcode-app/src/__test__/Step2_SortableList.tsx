import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, Space, Card, Tag, Button } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

// ============================================
// 第二步：列表排序（Sortable List）
// ============================================
// 核心概念：
// 1. SortableContext - 排序上下文，包裹可排序的列表
// 2. useSortable - 组合了 draggable + droppable，专门用于排序
// 3. arrayMove - 拖拽后重新排序数组的工具函数
// 4. verticalListSortingStrategy - 垂直列表排序策略
// ============================================

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

const initialTodos: TodoItem[] = [
  { id: '1', title: '学习 SortableContext', completed: false },
  { id: '2', title: '学习 useSortable', completed: false },
  { id: '3', title: '学习 arrayMove', completed: false },
  { id: '4', title: '实现拖拽排序', completed: false },
];

// 可排序的 TODO 项组件
function SortableTodo({ todo }: { todo: TodoItem }) {
  // useSortable 是 useDraggable + useDroppable 的组合
  // 它自动处理了排序所需的所有逻辑
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: todo,
  });

  // CSS.Transform.toString 会自动处理 transform 样式
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        size="small"
        style={{
          width: 350,
          border: isDragging ? '2px dashed #1890ff' : '1px solid #d9d9d9',
          backgroundColor: isDragging ? '#e6f7ff' : '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 拖拽手柄 - 只有点击这里才能拖拽 */}
          <div
            {...attributes}
            {...listeners}
            style={{
              cursor: 'grab',
              padding: '4px 8px',
              borderRadius: 4,
              backgroundColor: '#f0f0f0',
            }}
          >
            <MenuOutlined />
          </div>

          <Tag color={todo.completed ? 'success' : 'blue'}>{todo.id}</Tag>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#333',
            }}
          >
            {todo.title}
          </span>
        </div>
      </Card>
    </div>
  );
}

// 拖拽时的覆盖层组件
function DragOverlayItem({ todo }: { todo: TodoItem }) {
  return (
    <Card
      size="small"
      style={{
        width: 350,
        backgroundColor: '#1890ff',
        color: '#fff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        transform: 'scale(1.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: '4px 8px' }}>
          <MenuOutlined style={{ color: '#fff' }} />
        </div>
        <Tag color="white" style={{ color: '#1890ff' }}>
          {todo.id}
        </Tag>
        <span style={{ color: '#fff' }}>{todo.title}</span>
      </div>
    </Card>
  );
}

export default function Step2_SortableList() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 获取当前拖拽的元素
  const activeTodo = todos.find((t) => t.id === activeId);

  // 配置传感器 - 定义如何触发拖拽
  const sensors = useSensors(
    // 鼠标/触摸传感器
    useSensor(PointerSensor, {
      activationConstraint: {
        // 需要移动 8px 才算开始拖拽（防止误触）
        distance: 8,
      },
    }),
    // 键盘传感器 - 支持方向键排序
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 添加新 TODO
  const handleAddTodo = () => {
    const newId = String(todos.length + 1);
    setTodos([
      ...todos,
      { id: newId, title: `新任务 ${newId}`, completed: false },
    ]);
  };

  // 切换完成状态
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      // 碰撞检测策略 - closestCenter 表示找距离中心最近的元素
      collisionDetection={closestCenter}

      onDragStart={(event) => {
        console.log('🚀 开始拖拽:', event.active.id);
        setActiveId(event.active.id as string);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        setActiveId(null);

        // 如果没有放置到任何元素上，或者放置到自己身上，不做任何操作
        if (!over || active.id === over.id) {
          console.log('❌ 无效放置');
          return;
        }

        console.log('✅ 拖拽结束');
        console.log('   从位置:', active.id);
        console.log('   到位置:', over.id);

        // 重新排序数组
        setTodos((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          console.log('   原索引:', oldIndex, '→ 新索引:', newIndex);

          // arrayMove 会根据新旧索引重新排列数组
          return arrayMove(items, oldIndex, newIndex);
        });
      }}
      onDragCancel={() => {
        console.log('❌ 拖拽取消');
        setActiveId(null);
      }}
    >
      <Row justify="center" style={{ padding: 40 }}>
        <Space vertical size="large" style={{ width: 450 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>🎯 第二步：列表排序</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTodo}>
              添加任务
            </Button>
          </div>

          {/* 说明卡片 */}
          <Card type="inner" title="📚 核心概念" size="small">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                <b>SortableContext</b> - 包裹可排序的列表，需要传入 items
              </li>
              <li>
                <b>useSortable</b> - 组合了 draggable + droppable
              </li>
              <li>
                <b>arrayMove</b> - 根据新旧索引重新排序数组
              </li>
              <li>
                <b>strategy</b> - 排序策略（垂直/水平/网格）
              </li>
            </ul>
          </Card>

          {/* 排序列表 */}
          <Card
            title={`📋 待办列表（${todos.length} 项）`}
            extra={
              <Button size="small" onClick={() => setTodos(initialTodos)}>
                重置
              </Button>
            }
          >
            {/* 
              SortableContext 是排序的核心：
              - items: 必须传入所有可排序项的 id 数组
              - strategy: 排序策略，这里用垂直列表策略
            */}
            <SortableContext  
              items={todos.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {todos.map((todo) => (
                  <SortableTodo key={todo.id} todo={todo} />
                ))}
              </Space>
            </SortableContext>
          </Card>

          {/* 当前顺序显示 */}
          <Card type="inner" title="📊 当前顺序" size="small">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {todos.map((todo, index) => (
                <Tag key={todo.id} color="blue">
                  {index + 1}. {todo.title}
                </Tag>
              ))}
            </div>
          </Card>

          {/* 提示 */}
          <Card type="inner" size="small" style={{ backgroundColor: '#fffbe6' }}>
            💡 <b>操作提示：</b>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li>按住 ☰ 图标拖拽可以重新排序</li>
              <li>拖拽时其他项目会自动让出位置</li>
              <li>观察控制台输出的索引变化</li>
            </ul>
          </Card>
        </Space>
      </Row>

      {/* DragOverlay - 拖拽时的视觉元素 */}
      <DragOverlay>
        {activeTodo ? <DragOverlayItem todo={activeTodo} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
