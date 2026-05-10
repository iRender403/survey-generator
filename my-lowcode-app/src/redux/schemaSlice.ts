import { createSlice } from '@reduxjs/toolkit';
import { defaultStatusMap } from '@/config/dufaultStatues/defaultStatusMap'

const schemaSlice = createSlice({
  name: 'schema',
  initialState: {
    currentSelectStatus: 'single-select',
    com: {
      'single-select': defaultStatusMap['single-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
    }
  },
  reducers: {
    // 设置当前选中的组件状态
    setSelectStatus(state, {payload}) {
      state.currentSelectStatus = payload;
    },
    // 更新当前选中的组件的描述状态
    setTextStatue(state, {payload}) {
      state.com[state.currentSelectStatus].status.desc.status = payload;
    }
    
  },
})


export const { setSelectStatus, setTextStatue } = schemaSlice.actions;
export default schemaSlice.reducer; 