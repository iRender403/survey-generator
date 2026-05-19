/**
 * 数据埋点日志工具
 * 支持全局开关、模块化命名、环境自动判断
 */

// 埋点开关配置
interface LoggerConfig {
  enabled: boolean;
  modules: string[]; // 空数组表示所有模块
  level: 'debug' | 'info' | 'warn' | 'error';
}

// 默认配置
const defaultConfig: LoggerConfig = {
  enabled: import.meta.env.DEV, // 开发环境默认开启，生产环境默认关闭
  modules: [], // 空数组表示监听所有模块
  level: 'debug',
};

// 从 localStorage 读取配置
function getConfig(): LoggerConfig {
  try {
    const