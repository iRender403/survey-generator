/**
 * React 追踪 Hook
 * 用于组件渲染追踪和性能监控
 */

import { useRef, useEffect, type DependencyList } from 'react';
import { traceRender, type TraceModule } from './trace';

interface UseTraceRenderOptions {
  /** 追踪模块 */
  module?: TraceModule;
  /** 额外数据 */
  extraData?: Record<string, unknown>;
  /** 依赖项变化时重新追踪 */
  deps?: DependencyList;
}

/**
 * 追踪组件渲染
 * @param componentName 组件名称
 * @param options 配置选项
 * @example
 * ```tsx
 * function MyComponent({ data }) {
 *   useTraceRender('MyComponent', {
 *     extraData: { data },
 *     deps: [data]
 *   });
 *   return <div>{data}</div>;
 * }
 * ```
 */
export function useTraceRender(
  componentName: string,
  options: UseTraceRenderOptions = {}
): void {
  const { extraData, deps } = options;
  const renderCount = useRef(0);
  const prevDeps = useRef<DependencyList | undefined>(deps);

  // 检测依赖项变化
  const depsChanged = deps ? 
    !prevDeps.current || deps.some((dep, i) => dep !== prevDeps.current?.[i]) :
    false;

  useEffect(() => {
    prevDeps.current = deps;
  });

  traceRender(componentName, ++renderCount.current, {
    ...extraData,
    ...(deps !== undefined && { 
      depsChanged,
      deps: deps.map(d => typeof d === 'object' ? '[Object]' : d)
    }),
  });
}

/**
 * 追踪状态变化
 * @param name 状态名称
 * @param value 状态值
 * @param module 追踪模块
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * useTraceState('count', count, 'editor');
 * ```
 */
export function useTraceState<T>(
  name: string,
  value: T,
  module: TraceModule = 'redux'
): void {
  const prevValue = useRef<T>(value);
  const changeCount = useRef(0);

  useEffect(() => {
    const changed = prevValue.current !== value;
    if (changed) {
      changeCount.current++;
      traceRender(`State:${name}`, changeCount.current, {
        prevValue: prevValue.current,
        newValue: value,
        equal: JSON.stringify(prevValue.current) === JSON.stringify(value),
      });
    }
    prevValue.current = value;
  }, [value, name]);
}

/**
 * 追踪函数调用
 * @param fn 要追踪的函数
 * @param name 函数名称
 * @param module 追踪模块
 * @returns 包装后的函数
 * @example
 * ```tsx
 * const handleClick = useTraceCallback(
 *   () => console.log('clicked'),
 *   'handleClick',
 *   'editor'
 * );
 * ```
 */
export function useTraceCallback<T extends (...args: unknown[]) => unknown>(
  fn: T,
  name: string,
  module: TraceModule = 'editor'
): T {
  const callCount = useRef(0);

  return ((...args: Parameters<T>): ReturnType<T> => {
    callCount.current++;
    traceRender(`Callback:${name}`, callCount.current, {
      args: args.map(arg => typeof arg === 'object' ? '[Object]' : arg),
    });
    return fn(...args) as ReturnType<T>;
  }) as T;
}
