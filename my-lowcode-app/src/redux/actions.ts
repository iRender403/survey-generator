/**
 * 更新文本状态描述
 * @param state 初始状态
 * @param param1 修改后的状态
 */
export function setTextStatue(state, { payload }): any {
  // 更新描述状态
  state.com['single-select'].status.desc.status = payload;
}
