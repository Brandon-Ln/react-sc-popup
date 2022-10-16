import type { CSSStyleProps } from '@/utils/types';
import type { SpringConfig } from '@react-spring/web';

/**
 * @interface Mask
 */
export interface MaskProps extends CSSStyleProps {
  /**
   * 受控值，遮罩层是否可见
   */
  visible?: boolean;
  /**
   * 触发遮罩层事件
   */
  onTrigger?: (val: boolean) => void;
  /**
   * 过渡动画配置
   */
  transitionConfig?: SpringConfig;
}
