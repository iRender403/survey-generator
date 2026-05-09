import { createSlice } from '@reduxjs/toolkit';
import { defaultStatusMap } from '@/config/dufaultStatues/defaultStatusMap'

const schemaSlice = createSlice({
  name: 'schema',
  initialState: {
    com: {
      'single-select': defaultStatusMap['single-select'](),
    }
  },
  reducers: {
    setTextStatue(state, {payload}) {
      // 更新描述状态
      state.com['single-select'].status.desc.status = payload;
    }
  },
})


export const { setTextStatue } = schemaSlice.actions;
export default schemaSlice.reducer; 