import cls from 'classnames';
import { animated, useTransition as useSpringTransition } from '@react-spring/web';

import './index.scss';

import type { MaskProps } from './interface';

import { clsPrefix, maskEndOpacity, maskStartOpacity } from '@/utils/constants';
import { MouseEventHandler } from 'react';

/**
 * @interface MaskProps
 */
export function Mask(props: MaskProps) {
  const {
    className: userCls,
    visible,
    style: userStyle,
    transitionConfig,
    onTrigger,
    ...restProps
  } = props;

  // hooks
  const renderTransition = useSpringTransition(visible, {
    from: { opacity: maskStartOpacity },
    enter: { opacity: maskEndOpacity },
    leave: { opacity: maskStartOpacity },
    config: transitionConfig,
  });

  // handlers
  const handleClick: MouseEventHandler = (e) => {
    onTrigger(!visible, e);
  };

  // preserve 模式下始终保留 DOM 元素
  return renderTransition(({ opacity }, visible) =>
    visible ? (
      <animated.div
        className={cls(`${clsPrefix}__mask`, userCls)}
        style={{ ...userStyle, opacity }}
        onClick={handleClick}
        aria-label="mask"
        {...restProps}
      />
    ) : null
  );
}
