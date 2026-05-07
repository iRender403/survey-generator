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
  },
})

export default schemaSlice.reducer; 