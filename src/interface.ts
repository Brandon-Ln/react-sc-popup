import type { CSSProperties } from 'react';

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
