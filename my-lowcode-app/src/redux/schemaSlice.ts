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
      console.log('[埋点][schemaSlice] setSelectStatus 执行, 新状态:', payload);
      console.log('[埋点][schemaSlice] 原状态:', state.currentSelectStatus);
      state.currentSelectStatus = payload;
      console.log('[埋点][schemaSlice] 当前选中组件:', state.currentSelectStatus);
    },
    // 更新当前选中的组件的描述状态
    setTextStatue(state, { payload }) {
      console.log('[埋点][schemaSlice] setTextStatue 执行');
      console.log('[埋点][schemaSlice] 当前组件:', state.currentSelectStatus);
      const oldValue = state.com[state.currentSelectStatus].status.desc.status;
      state.com[state.currentSelectStatus].status.desc.status = payload;
      console.log('[埋点][schemaSlice] desc 更新 - 旧值:', oldValue, '新值:', payload);
    },
    // 更新图片选项状态
    setPicOptions(state, { payload }) {
      console.log('[埋点][schemaSlice] setPicOptions 执行');
      console.log('[埋点][schemaSlice] 当前组件:', state.currentSelectStatus);
      const oldValue = state.com[state.currentSelectStatus].status.options.status;
      state.com[state.currentSelectStatus].status.options.status = payload;
      console.log('[埋点][schemaSlice] picOptions 更新 - 旧值:', oldValue, '新值:', payload);
    },
    // 更新普通选项状态
    setOptions(state, { payload }) {
      console.log('[埋点][schemaSlice] setOptions 执行');
      console.log('[埋点][schemaSlice] 当前组件:', state.currentSelectStatus);
      const oldValue = state.com[state.currentSelectStatus].status.options.status;
      state.com[state.currentSelectStatus].status.options.status = payload;
      console.log('[埋点][schemaSlice] options 更新 - 旧值:', oldValue, '新值:', payload);
    },
    // 更新标题状态
    setTitle(state, { payload }) {
      console.log('[埋点][schemaSlice] setTitle 执行');
      console.log('[埋点][schemaSlice] 当前组件:', state.currentSelectStatus);
      const oldValue = state.com[state.currentSelectStatus].status.title.status;
      state.com[state.currentSelectStatus].status.title.status = payload;
      console.log('[埋点][schemaSlice] title 更新 - 旧值:', oldValue, '新值:', payload);
    },
    // 更新内容状态
    setContent(state, { payload }) {
      console.log('[埋点][schemaSlice] setContent 执行');
      console.log('[埋点][schemaSlice] 当前组件:', state.currentSelectStatus);
      const oldValue = state.com[state.currentSelectStatus].status.content.status;
      state.com[state.currentSelectStatus].status.content.status = payload;
      console.log('[埋点][schemaSlice] content 更新 - 旧值:', oldValue, '新值:', payload);
    },
  },
});
export type SchemaState = typeof initialState;
export const { setSelectStatus, setTextStatue, setPicOptions, setOptions, setTitle, setContent } = schemaSlice.actions;
export default schemaSlice.reducer;
