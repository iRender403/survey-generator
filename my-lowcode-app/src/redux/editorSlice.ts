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
  },
});

export type EditorState = typeof initialState;
export const { setCurrentIndex, addComponentStatus, updateComponentStatus, reorderComponents } = editorSlice.actions;
export default editorSlice.reducer;
