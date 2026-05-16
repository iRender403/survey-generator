// views/EditorView/CenterView.tsx
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { materialComponentMap } from "@/config/dufaultStatues/componentMap";
import { setCurrentIndex, reorderComponents, removeComponent } from "@/redux/editorSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks";
import DraggableCom from "@/hooks/DraggableCom";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import type { ComponentStatus } from "@/types/schemaDiscript";

export default function CenterView() {
  const dispatch = useAppDispatch();
  // 从 editor store 获取画布上的组件列表
  const comStatus: ComponentStatus[] = useAppSelector((state) => state.editor.comStatus);

  // 修改编辑器画布中当前选中的组件索引
  function clickHanle(index: number) {
    console.log("点击了组件", index);
    dispatch(setCurrentIndex(index));
  }

  const [activeId, setActiveId] = useState<string | null>(null);
  // 设置拖拽触发条件
  // 配置传感器 - 定义如何触发拖拽
  const sensors = useSensors(
    // 鼠标/触摸传感器
    useSensor(PointerSensor, {
      activationConstraint: {
        // 需要移动 8px 才算开始拖拽（防止误触）
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={(event) => {
        const oldIndex = comStatus.findIndex((item) => item.id === activeId);
        const newIndex = comStatus.findIndex((item) => item.id === event.over?.id);
        setActiveId(null);
        if (oldIndex !== -1 && newIndex !== -1) {
          dispatch(reorderComponents({ oldIndex, newIndex }));
        }
      }}
    >
      <SortableContext items={comStatus.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ padding: "20px" }}>
          {comStatus.map((component, index) => {
            // 根据 type 获取对应的渲染组件
            const MaterialComponent = materialComponentMap[component.type];

            if (!MaterialComponent) {
              console.warn(`未知的组件类型: ${component.type}`);
              return null;
            }
            return (
              <div
                key={component.id}
                onClick={() => {
                  clickHanle(index);
                }}
                style={{ marginBottom: "20px", position: "relative" }}
              >
                <DraggableCom id={component.id}>
                  <MaterialComponent status={component.status} />
                </DraggableCom>
                <DeleteOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeComponent({ id: component.id }));
                  }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    fontSize: "18px",
                    color: "#ff4d4f",
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "4px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff2f0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                />
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
