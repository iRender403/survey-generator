import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

export default function Droppable({ children, id }: { children: ReactNode; id: string }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
}