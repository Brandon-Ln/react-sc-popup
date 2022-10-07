import type { SpringConfig } from '@react-spring/web';
import type { CSSProperties, HTMLAttributes } from 'react';

import type { PotalProps } from './depends/Portal/interface';

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

export type PopupPlacement = 'left' | 'right' | 'bottom' | 'center' | 'top';

export interface PopupProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * 挂载节点的容器
   * @default document.body
   */
  container?: PotalProps['container'];
  /**
   * 过渡配置
   */
  transitionConfig?: SpringConfig;
  /**
   * 弹出层是否可见
   */
  visible?: boolean;
  /**
   * 受控值改变时触发的事件函数
   */
  onChange?: (val: boolean) => void;
  /**
   * 位置
   * @default 'center'
   */
  placement?: PopupPlacement;
}
