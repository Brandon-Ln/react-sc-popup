import { CSSProperties } from 'react';

/**
 * CSS 样式 props
 */
export interface CSSStyleProps {
  /**
   * 类样式名
   */
  className?: string;
  /**
   * 内联样式名
   */
  style?: CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn<Args extends unknown[] = any[], Res = any> = (...args: Args) => Res;

export type FnWithoutThis<T extends Fn> = (args: Parameters<T>) => ReturnType<T>;
