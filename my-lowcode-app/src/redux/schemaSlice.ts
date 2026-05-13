import { createSlice } from '@reduxjs/toolkit';
import { defaultStatusMap } from '@/config/dufaultStatues/defaultStatusMap';

const schemaSlice = createSlice({
  name: 'schema',
  initialState: {
    currentSelectStatus: 'single-select',
    com: {
      'single-select': defaultStatusMap['single-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
    },
  },
  reducers: {
    // 设置当前选中的组件状态
    setSelectStatus(state, { payload }) {
      state.currentSelectStatus = payload;
    },
    // 更新当前选中的组件的描述状态
    setTextStatue(state, { payload }) {
      state.com[state.currentSelectStatus].status.desc.status = payload;
    },
    // 更新图片选项状态
    setPicOptions(state, { payload }) {
      state.com[state.currentSelectStatus].status.options.status = payload;
    },
    // 更新普通选项状态
    setOptions(state, { payload }) {
      state.com[state.currentSelectStatus].status.options.status = payload;
    },
    // 更新标题状态
    setTitle(state, { payload }) {
      state.com[state.currentSelectStatus].status.title.status = payload;
    },
  },
});

export const { setSelectStatus, setTextStatue, setPicOptions, setOptions, setTitle } = schemaSlice.actions;
export default schemaSlice.reducer;
