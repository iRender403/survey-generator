import { configureStore } from '@reduxjs/toolkit'
import schemaReducer from './slices/schemaSlice'


export const store = configureStore({
  reducer: {
    selectStatus: schemaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
