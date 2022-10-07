import cls from 'classnames';
import { useSpring, animated, useTransition as useSpringTransition } from '@react-spring/web';
import { useRef } from 'react';

import './index.scss';

import type { MaskProps } from './interface';

import { clsPrefix } from '@/utils/constants';
import { useMounted } from '@/hooks/useMounted';

const startOpacity = 0;
const endOpacity = 1;

/**
 * @interface MaskProps
 */
export function Mask(props: MaskProps) {
  const {
    className: userCls,
    visible,
    style: userStyle,
    transitionConfig,
    preserve,
    onTrigger,
    ...restProps
  } = props;

  // ref
  const elRef = useRef<HTMLDivElement>(null);

  // hooks
  const mounted = useMounted(true);

  const { opacity } = useSpring({
    opacity: mounted() && visible ? endOpacity : startOpacity,
    config: transitionConfig,
    /**
     * preserve 模式下改变 DOM 的可见性
     */
    onStart() {
      if (visible && preserve && elRef.current) {
        elRef.current.style.display = '';
      }
    },
    onRest() {
      if (!visible && elRef.current && preserve) {
        elRef.current.style.display = 'none';
      }
    },
  });

  const renderTransition = useSpringTransition(visible, {
    from: { opacity: startOpacity },
    enter: { opacity: endOpacity },
    leave: { opacity: startOpacity },
    config: transitionConfig,
  });

  // handlers
  function handleClick() {
    onTrigger && onTrigger(!visible);
  }

  // preserve 模式下始终保留 DOM 元素
  return preserve ? (
    <animated.div
      ref={elRef}
      className={cls(`${clsPrefix}__mask`, userCls)}
      style={{ ...userStyle, opacity }}
      onClick={handleClick}
      aria-label="mask"
      {...restProps}
    />
  ) : (
    renderTransition(({ opacity }, visible) =>
      visible ? (
        <animated.div
          className={cls(`${clsPrefix}__mask`, userCls)}
          style={{ ...userStyle, opacity }}
          onClick={handleClick}
          aria-label="mask"
          {...restProps}
        />
      ) : null
    )
  );
}
