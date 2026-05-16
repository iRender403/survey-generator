import { createSlice } from '@reduxjs/toolkit';
import type { ComponentStatus } from "@/types/schemaDiscript";

const initialState = {
  currentIndex: -1 as number,
  comStatus: [] as ComponentStatus[],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // 设置当前选中的组件索引
    setCurrentIndex(state: EditorState, { payload }: { payload: number }) {
      state.currentIndex = payload;
    },
    // 设置当前选中的组件状态
    addComponentStatus(state: EditorState, { payload }: { payload: ComponentStatus }) {
      state.comStatus.push(payload);
    },
    // 更新当前选中组件的某个状态字段
    updateComponentStatus(
      state: EditorState,
      { payload }: { payload: { type: string; value: any } }
    ) {
      if (state.currentIndex >= 0 && state.currentIndex < state.comStatus.length) {
        const currentComponent = state.comStatus[state.currentIndex];
        if (currentComponent.status[payload.type as keyof typeof currentComponent.status]) {
          (currentComponent.status[payload.type as keyof typeof currentComponent.status] as any).status = payload.value;
        }
      }
    },
    // 重新排序组件列表
    reorderComponents(
      state: EditorState,
      { payload }: { payload: { oldIndex: number; newIndex: number } }
    ) {
      const { oldIndex, newIndex } = payload;
      if (
        oldIndex >= 0 &&
        oldIndex < state.comStatus.length &&
        newIndex >= 0 &&
        newIndex < state.comStatus.length
      ) {
        const [movedItem] = state.comStatus.splice(oldIndex, 1);
        state.comStatus.splice(newIndex, 0, movedItem);
      }
    },
    // 删除组件
    removeComponent(
      state: EditorState,
      { payload }: { payload: { id: string } }
    ) {
      const index = state.comStatus.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.comStatus.splice(index, 1);
        // 如果删除的是当前选中的组件，重置 currentIndex
        if (state.currentIndex === index) {
          state.currentIndex = -1;
        } else if (state.currentIndex > index) {
          // 如果删除的组件在当前选中组件之前，需要调整 currentIndex
          state.currentIndex -= 1;
        }
      }
    },
  },
});

export type EditorState = typeof initialState;
export const { setCurrentIndex, addComponentStatus, updateComponentStatus, reorderComponents, removeComponent } = editorSlice.actions;
export default editorSlice.reducer;
