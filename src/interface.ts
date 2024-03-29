import type { SpringConfig } from '@react-spring/web';
import type { CSSProperties, HTMLAttributes } from 'react';

import type { PotalProps } from './depends/Portal/interface';

export type PopupPlacement = 'left' | 'right' | 'bottom' | 'center' | 'top';

/**
 * @interface Popup
 */
export interface PopupProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * 挂载节点的容器
   * @default document.body
   */
  container?: PotalProps['container'];
  /**
   * 过渡配置
   * @default config.default
   */
  transitionConfig?: SpringConfig;
  /**
   * 受控值，弹出层是否可见
   */
  visible: boolean;
  /**
   * 受控值改变时触发的事件函数
   */
  onChange?: (val: boolean) => void;
  /**
   * 即将执行关闭时触发的事件函数
   */
  onBeforeClose?: VoidFunction;
  /**
   * 已经完成关闭时触发的事件函数
   */
  onClosed?: VoidFunction;
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
   * 是否阻止点击遮罩层时触发的 onChange 事件
   */
  preventMaskTrigger?: boolean;
  /**
   * 弹出层唤起不展示遮罩层
   */
  withoutMask?: boolean;
  /**
   * 检测判断为触发滑动手势的速度
   * @default 3
   */
  detectSwipeVelocity?: number;
  /**
   * 是否禁止滑动手势
   */
  disableSwipe?: boolean;
  /**
   * 是否禁止拖动手势
   */
  disableDrag?: boolean;
  /**
   * 是否阻止绑定的默认事件触发
   */
  preventDefault?: boolean;
  /**
   * 是否阻止绑定的默认事件冒泡
   */
  stopPropagation?: boolean;
  /**
   * 遮罩层的样式类
   */
  maskClassName?: string;
  /**
   * 遮罩层的内联样式
   */
  maskStyle?: CSSProperties;
}

/**
 * @interface Popup
 */
export type UncontrolledPopupProps = Omit<PopupProps, 'visible'>;

/**
 * @interface Popup
 */
export interface PopupInstance {
  /**
   * 更新 Popup 方法
   * @param props UncontrolledPopupProps
   */
  update(props?: UncontrolledPopupProps): void;
  /**
   * 卸载 Popup 方法
   */
  unmount: VoidFunction;
}
