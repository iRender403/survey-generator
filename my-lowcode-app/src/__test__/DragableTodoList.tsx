import { Row, Space, Card ,Tag,} from "antd";
import { useState } from "react";
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";



interface TodoItem {
  id: string;
  title: string;
}

const initialTodos: TodoItem[] = [
  { id: "1", title: "学习 useDraggable" },
  { id: "2", title: "学习 useDroppable" },
  { id: "3", title: "学习 DragOverlay" },
];

/**
 * 可拖拽选项
 * @param param
 * @returns
 */
function TodoItem({ id, title }: TodoItem) {
  /**
   * - listeners: 拖拽事件监听器
   * - attributes: 可访问性属性
   * - setNodeRef: 用于标记哪个 DOM 节点是可拖拽的
   * - transform: 拖拽时的位移信息
   */
    const { listeners, attributes, setNodeRef, transform, isDragging } = useDraggable({
      id,
      data: {
        title,
      },
    });

  const style = {
    border: "1px solid #000",
    padding: "10px",
    borderRadius: "5px",
    width: "300px",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1, // 拖拽时半透明
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {title}
    </div>
  );
}

/**
 * 可拖拽区域
 * @param param
 * @returns
 */
// 放置区域组件
function DroppableZone({
  id,
  title,
  children,
  isOver,
}: {
  id: string;
  title: string;
  children?: React.ReactNode;
  isOver?: boolean;
}) {
  // useDroppable 返回：
  // - setNodeRef: 用于标记哪个 DOM 节点是放置区域
  // - isOver: 是否有元素正在该区域上方
  const { setNodeRef, isOver: over } = useDroppable({
    id: id,
  });

  const isActive = isOver ?? over;

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: 200,
        padding: 16,
        backgroundColor: isActive ? "#f6ffed" : "#fafafa",
        border: isActive ? "2px dashed #52c41a" : "2px dashed #d9d9d9",
        borderRadius: 8,
        transition: "all 0.2s",
      }}
    >
      <h4 style={{ marginTop: 0, color: isActive ? "#52c41a" : "#666" }}>
        {title} {isActive && "👋"}
      </h4>
      <Space vertical style={{ width: "100%" }}>
        {children}
      </Space>
    </div>
  );
}

export default function  Step1_BasicDrag() {
  const [todos] = useState<TodoItem[]>(initialTodos);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastDropTarget, setLastDropTarget] = useState<string | null>(null);

  // 获取当前拖拽的元素
  const activeTodo = todos.find((t) => t.id === activeId);

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      // 拖拽结束
      onDragEnd={(event) => {
        const { active, over } = event;
        console.log('✅ 拖拽结束');
        console.log('   拖拽的元素:', active.id);
        console.log('   放置到:', over?.id ?? '没有放置到任何区域');

        if (over) {
          setLastDropTarget(over.id as string);
        }
        setActiveId(null);
      }}
      // 拖拽取消
      onDragCancel={() => {
        console.log('❌ 拖拽取消');
        setActiveId(null);
      }}
    >
      <Row justify="center" style={{ padding: 40 }}>
        <Space direction="vertical" size="large" style={{ width: 600 }}>
          <h2>🎯 第一步：基础拖拽</h2>
          
          {/* 说明卡片 */}
          <Card type="inner" title="📚 核心概念" size="small">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><b>DndContext</b> - 包裹整个拖拽区域</li>
              <li><b>useDraggable</b> - 让元素可以被拖拽</li>
              <li><b>useDroppable</b> - 让区域可以接收拖拽</li>
              <li><b>DragOverlay</b> - 拖拽时跟随鼠标的视觉元素</li>
            </ul>
          </Card>

          {/* 状态显示 */}
          <Card type="inner" title="📊 当前状态" size="small">
            <p style={{ margin: '0 0 8px 0' }}>
              正在拖拽: {activeId ? <Tag color="processing">{activeId}</Tag> : <Tag>无</Tag>}
            </p>
            <p style={{ margin: 0 }}>
              最后放置到: {lastDropTarget ? <Tag color="success">{lastDropTarget}</Tag> : <Tag>无</Tag>}
            </p>
          </Card>

          {/* 拖拽源区域 */}
          <DroppableZone id="source-zone" title="📦 拖拽源区域（从这里拖）">
            {todos.map((todo) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} />
            ))}
          </DroppableZone>

          {/* 目标放置区域 */}
          <DroppableZone id="target-zone" title="🎯 目标区域（拖到这里）" />

          {/* 提示 */}
          <Card type="inner" size="small" style={{ backgroundColor: '#fffbe6' }}>
            💡 <b>操作提示：</b>试着把上面的卡片拖到"目标区域"，观察控制台输出和状态变化
          </Card>
        </Space>
      </Row>

      {/* DragOverlay - 拖拽时跟随鼠标显示的元素 */}
      <DragOverlay>
        {activeTodo ? (
          <Card
            size="small"
            style={{
              width: 300,
              backgroundColor: '#a323a7ff',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <Tag color="white" style={{ color: '#2b669cff' }}>{activeTodo.id}</Tag>
            {activeTodo.title}
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
