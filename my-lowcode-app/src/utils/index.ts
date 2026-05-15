// 工具库
import type { TextProps, OptionsProps } from '@/types/editPropsType';

/**
 * 获取文本状态
 */
export function getTextStatus(props:TextProps ) {
  return props.status;
}

/**
 * 获取字符串状态
 */
export function getStringStatus(props: OptionsProps) {
  return props.status;
}

/**
 * 获取当前状态
 */
export function getCurrentStatus(props: OptionsProps) {
  return props.currentStatus;
}

/**
 * 根据当前状态获取字符串状态
 */
export function getStringStatusByCurrentStatus(props: OptionsProps) {
  return props.status[props.currentStatus];
}
