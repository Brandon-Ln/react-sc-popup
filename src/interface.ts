import type { SpringConfig } from '@react-spring/web';
import type { CSSProperties, HTMLAttributes } from 'react';

import type { PotalProps } from './depends/Portal/interface';

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
  /**
   * 是否保留 DOM 元素
   */
  preserve?: boolean;
  /**
   * 弹出层的宽度
   */
  width?: number | string;
  /**
   * 弹出层的高度
   */
  height?: number | string;
  /**
   * 遮罩层的样式类
   */
  maskClassName?: string;
  /**
   * 遮罩层的内联样式
   */
  maskStyle?: CSSProperties;
}
