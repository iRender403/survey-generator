import { createSlice } from '@reduxjs/toolkit';
import { defaultStatusMap } from '@/config/dufaultStatues/defaultStatusMap';

const initialState = {
  currentSelectStatus: 'single-select',
  com: {
    'single-select': defaultStatusMap['single-select'](),
    'single-pic-select': defaultStatusMap['single-pic-select'](),
    'multi-select': defaultStatusMap['multi-select'](),
    'input': defaultStatusMap['input'](),
  },
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
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
    // 更新内容状态
    setContent(state, { payload }) {
      state.com[state.currentSelectStatus].status.content.status = payload;
    },
  },
});
export type SchemaState = typeof initialState;
export const { setSelectStatus, setTextStatue, setPicOptions, setOptions, setTitle, setContent } = schemaSlice.actions;
export default schemaSlice.reducer;
