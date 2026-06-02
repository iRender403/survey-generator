/**
 * 开发调试追踪系统
 */

// 追踪模块类型
export type TraceModule =
  | 'material'      // 组件市场
  | 'editor'        // 编辑器画布
  | 'redux'         // Redux 状态
  | 'context'       // Context 更新
  | 'render'        // 组件渲染
  | 'all';          // 所有模块

// 追踪级别
export type TraceLevel = 'debug' | 'info' | 'warn' | 'error';

// 追踪配置接口
interface TraceConfig {
  enabled: boolean;           // 是否使用开关
  modules: TraceModule[];     // 追踪模块
  level: TraceLevel;          // 追踪级别
  showTimestamp: boolean;     // 是否显示时间戳
  groupByModule: boolean;     // 是否按模块分组输出
}

// 默认配置
const defaultConfig: TraceConfig = {
  enabled: false,
  modules: [],
  level: 'debug',
  showTimestamp: true,
  groupByModule: true,
};

// 运行时配置
let currentConfig: TraceConfig = { ...defaultConfig };

// 模块名称映射
const moduleNames: Record<TraceModule, string> = {
  material: '组件市场',
  editor: '编辑器画布',
  redux: 'Redux状态',
  context: 'Context更新',
  render: '组件渲染',
  all: '全部模块',
};

// 级别颜色映射
const levelColors: Record<TraceLevel, string> = {
  debug: '#6c757d',
  info: '#0d6efd',
  warn: '#ffc107',
  error: '#dc3545',
};

/**
 * 初始化追踪系统
 * 从环境变量和 URL 参数读取配置
 */
export function initTrace(): void {
  // 1. 从环境变量读取
  const envEnabled = import.meta.env.VITE_TRACE_ENABLED === 'true';
  const envModules = (import.meta.env.VITE_TRACE_MODULES || '').split(',').filter(Boolean) as TraceModule[];

  // 2. 从 URL 参数读取
  const urlParams = new URLSearchParams(window.location.search);
  const urlTrace = urlParams.get('trace');

  if (urlTrace !== null) {
    // URL 中有 trace 参数
    if (urlTrace === '' || urlTrace === 'true') {
      // ?trace 或 ?trace=true 启用所有模块
      currentConfig.enabled = true;
      currentConfig.modules = ['all'];
    } else if (urlTrace === 'false') {
      // ?trace=false 关闭追踪
      currentConfig.enabled = false;
      currentConfig.modules = [];
    } else {
      // ?trace=module1,module2 启用指定模块
      currentConfig.enabled = true;
      currentConfig.modules = urlTrace.split(',') as TraceModule[];
    }
  } else {
    // 使用环境变量配置
    currentConfig.enabled = envEnabled;
    currentConfig.modules = envModules.length > 0 ? envModules : ['all'];
  }

  // 3. 开发环境默认启用（可选）
  if (import.meta.env.DEV && !urlParams.has('trace')) {
    // 开发环境可以默认启用，但这里保持显式控制
    // currentConfig.enabled = true;
    // currentConfig.modules = ['all'];
  }

  if (currentConfig.enabled) {
    console.log(
      `%c[追踪系统] 已启用 | 模块: ${currentConfig.modules.map(m => moduleNames[m]).join(', ')}`,
      'color: #28a745; font-weight: bold;'
    );
  }
}

/**
 * 检查模块是否启用
 */
function isModuleEnabled(module: TraceModule): boolean {
  if (!currentConfig.enabled) return false;
  if (currentConfig.modules.includes('all')) return true;
  return currentConfig.modules.includes(module);
}

/**
 * 获取时间戳
 */
function getTimestamp(): string {
  if (!currentConfig.showTimestamp) return '';
  const now = new Date();
  return `[${now.toLocaleTimeString('zh-CN', { hour12: false })}.${String(now.getMilliseconds()).padStart(3, '0')}]`;
}

/**
 * 核心追踪函数
 * @param module 追踪模块
 * @param action 动作名称
 * @param data 追踪数据
 * @param level 追踪级别
 */
export function trace(
  module: TraceModule,
  action: string,
  data?: unknown,
  level: TraceLevel = 'debug'
): void {
  if (!isModuleEnabled(module)) return;

  const timestamp = getTimestamp();
  const moduleName = moduleNames[module];
  const prefix = `${timestamp}[${moduleName}]`;

  // 根据级别使用不同的 console 方法
  const consoleMethod = level === 'error' ? console.error
    : level === 'warn' ? console.warn
    : level === 'info' ? console.info : console.log;

  // 样式
  const color = levelColors[level];
  const style = `color: ${color}; font-weight: bold;`;

  if (currentConfig.groupByModule) {
    // 分组输出
    console.groupCollapsed(`%c${prefix} ${action}`, style);
    if (data !== undefined) {
      console.log('数据:', data);
    }
    console.trace('调用栈');
    console.groupEnd();
  } else {
    // 单行输出
    if (data !== undefined) {
      consoleMethod(`%c${prefix} ${action}`, style, data);
    } else {
      consoleMethod(`%c${prefix} ${action}`, style);
    }
  }
}

/**
 * 追踪渲染
 * @param componentName 组件名
 * @param renderCount 渲染次数
 * @param extraData 额外数据
 */
export function traceRender(
  componentName: string,
  renderCount: number,
  extraData?: Record<string, unknown>
): void {
  if (!isModuleEnabled('render')) return;

  const timestamp = getTimestamp();
  const prefix = `${timestamp}[渲染]`;

  console.groupCollapsed(
    `%c${prefix} ${componentName} | 第 ${renderCount} 次渲染`,
    'color: #17a2b8; font-weight: bold;'
  );

  if (extraData) {
    Object.entries(extraData).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
  }

  console.groupEnd();
}

/**
 * 追踪性能耗时
 * @param label 标记名称
 * @param fn 要执行的函数
 * @returns 函数返回值
 */
export function tracePerformance<T>(label: string, fn: () => T): T {
  if (!currentConfig.enabled) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(
    `%c[性能] ${label}: ${(end - start).toFixed(2)}ms`,
    'color: #fd7e14; font-weight: bold;'
  );

  return result;
}

/**
 * 动态启用/禁用追踪
 * @param enabled 是否启用
 * @param modules 指定模块（可选）
 */
export function setTraceEnabled(enabled: boolean, modules?: TraceModule[]): void {
  currentConfig.enabled = enabled;
  if (modules) {
    currentConfig.modules = modules;
  }

  console.log(
    `%c[追踪系统] ${enabled ? '已启用' : '已禁用'}`,
    `color: ${enabled ? '#28a745' : '#dc3545'}; font-weight: bold;`
  );
}

/**
 * 获取当前配置
 */
export function getTraceConfig(): Readonly<TraceConfig> {
  return { ...currentConfig };
}

/**
 * 快捷方法：按模块创建追踪函数
 * @param module 模块名
 * @returns 绑定模块的追踪函数
 */
export function createTracer(module: TraceModule) {
  return {
    log: (action: string, data?: unknown) => trace(module, action, data, 'debug'),
    info: (action: string, data?: unknown) => trace(module, action, data, 'info'),
    warn: (action: string, data?: unknown) => trace(module, action, data, 'warn'),
    error: (action: string, data?: unknown) => trace(module, action, data, 'error'),
  };
}

// 预定义的模块追踪器
export const materialTracer = createTracer('material');
export const editorTracer = createTracer('editor');
export const reduxTracer = createTracer('redux');
export const contextTracer = createTracer('context');
export const renderTracer = createTracer('render');
