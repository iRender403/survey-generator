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
    // 设置当前选中的组件状态
    addComponentStatus(state: EditorState, { payload }: { payload: ComponentStatus }) {
      state.comStatus.push(payload);
    },
  },
});

export type EditorState = typeof initialState;
export const { addComponentStatus } = editorSlice.actions;
export default editorSlice.reducer;
