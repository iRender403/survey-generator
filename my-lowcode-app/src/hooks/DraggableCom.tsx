import { useSortable } from "@dnd-kit/sortable";

export default function DraggableCom({ children, id }) {
  const { listeners, attributes, setNodeRef, transform, isDragging } = useSortable({
    id,
  });

  return (
    <div
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1, // 拖拽时半透明
        cursor: "default",
      }}
    >
      {children}
    </div>
  );
}
