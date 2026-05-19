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
    // 设置当前选中的组件索引
    setCurrentIndex(state: EditorState, { payload }: { payload: number }) {
      console.log('[埋点][editorSlice] setCurrentIndex 执行, 新索引:', payload);
      state.currentIndex = payload;
      console.log('[埋点][editorSlice] 当前状态 - currentIndex:', state.currentIndex, 'comStatus长度:', state.comStatus.length);
    },
    // 设置当前选中的组件状态
    addComponentStatus(state: EditorState, { payload }: { payload: ComponentStatus }) {
      console.log('[埋点][editorSlice] addComponentStatus 执行');
      console.log('[埋点][editorSlice] 添加前 comStatus 长度:', state.comStatus.length);
      state.comStatus.push(payload);
      console.log('[埋点][editorSlice] 添加后 comStatus 长度:', state.comStatus.length);
      console.log('[埋点][editorSlice] 添加的组件:', payload.type, payload.name);
    },
    // 更新当前选中组件的某个状态字段
    updateComponentStatus(
      state: EditorState,
      { payload }: { payload: { type: string; value: any } }
    ) {
      console.log('[埋点][editorSlice] updateComponentStatus 执行');
      console.log('[埋点][editorSlice] 更新类型:', payload.type, '更新值:', payload.value);
      console.log('[埋点][editorSlice] 当前索引:', state.currentIndex);
      
      if (state.currentIndex >= 0 && state.currentIndex < state.comStatus.length) {
        const currentComponent = state.comStatus[state.currentIndex];
        console.log('[埋点][editorSlice] 当前组件:', currentComponent.type, currentComponent.name);
        
        if (currentComponent.status[payload.type as keyof typeof currentComponent.status]) {
          const oldValue = (currentComponent.status[payload.type as keyof typeof currentComponent.status] as any).status;
          (currentComponent.status[payload.type as keyof typeof currentComponent.status] as any).status = payload.value;
          console.log('[埋点][editorSlice] 更新成功 - 旧值:', oldValue, '新值:', payload.value);
        } else {
          console.warn('[埋点][editorSlice] 警告: 组件状态字段不存在:', payload.type);
        }
      } else {
        console.warn('[埋点][editorSlice] 警告: 当前索引无效:', state.currentIndex);
      }
    },
    // 重新排序组件列表
    reorderComponents(
      state: EditorState,
      { payload }: { payload: { oldIndex: number; newIndex: number } }
    ) {
      const { oldIndex, newIndex } = payload;
      if (
        oldIndex >= 0 &&
        oldIndex < state.comStatus.length &&
        newIndex >= 0 &&
        newIndex < state.comStatus.length
      ) {
        const [movedItem] = state.comStatus.splice(oldIndex, 1);
        state.comStatus.splice(newIndex, 0, movedItem);
      }
    },
    // 删除组件
    removeComponent(
      state: EditorState,
      { payload }: { payload: { id: string } }
    ) {
      const index = state.comStatus.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.comStatus.splice(index, 1);
        // 如果删除的是当前选中的组件，重置 currentIndex
        if (state.currentIndex === index) {
          state.currentIndex = -1;
        } else if (state.currentIndex > index) {
          // 如果删除的组件在当前选中组件之前，需要调整 currentIndex
          state.currentIndex -= 1;
        }
      }
    },
  },
});

export type EditorState = typeof initialState;
export const { setCurrentIndex, addComponentStatus, updateComponentStatus, reorderComponents, removeComponent } = editorSlice.actions;
export default editorSlice.reducer;
