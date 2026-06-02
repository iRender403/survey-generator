/**
 * 追踪系统入口
 * 
 * 使用方式：
 * 
 * 1. 在应用入口初始化（main.tsx）
 *    import { initTrace } from '@/utils/trace';
 *    initTrace();
 * 
 * 2. URL 参数控制：
 *    - ?trace          启用所有模块
 *    - ?trace=true     启用所有模块
 *    - ?trace=false    禁用追踪
 *    - ?trace=material,redux  启用指定模块
 * 
 * 3. 环境变量配置（.env）：
 *    VITE_TRACE_ENABLED=true
 *    VITE_TRACE_MODULES=material,redux,editor
 * 
 * 4. 代码中使用：
 *    import { trace, materialTracer, useTraceRender } from '@/utils/trace';
 *    
 *    // 通用追踪
 *    trace('material', '组件被点击', { id: 1 });
 *    
 *    // 模块追踪器
 *    materialTracer.log('组件被点击', { id: 1 });
 *    
 *    // React Hook
 *    useTraceRender('MyComponent', { extraData: { props } });
 */

export {
  // 核心函数
  initTrace,
  trace,
  traceRender,
  tracePerformance,
  setTraceEnabled,
  getTraceConfig,
  createTracer,
  
  // 预定义追踪器
  materialTracer,
  editorTracer,
  reduxTracer,
  contextTracer,
  renderTracer,
} from './trace';

export type { TraceModule, TraceLevel } from './trace';

export {
  // React Hooks
  useTraceRender,
  useTraceState,
  useTraceCallback,
} from './useTrace';
