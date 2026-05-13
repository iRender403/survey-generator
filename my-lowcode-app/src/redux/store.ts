import { configureStore } from '@reduxjs/toolkit';
import schemaReducer from './schemaSlice';
import editorReducer from './editorSlice';

export const store = configureStore({
  reducer: {
    selectStatus: schemaReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
