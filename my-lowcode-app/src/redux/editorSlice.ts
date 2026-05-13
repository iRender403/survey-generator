import { createSlice } from '@reduxjs/toolkit';

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    currentIndex: -1,
    comStatus: [],
  },
  reducers: {
    // 设置当前选中的组件状态
    addComponentStatus(state, { payload }) {
      state.comStatus.push(payload);
    },
  },
});

export const { addComponentStatus } = editorSlice.actions;
export default editorSlice.reducer;
