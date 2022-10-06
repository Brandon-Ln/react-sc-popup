import cls from 'classnames';
import { useSpring, animated } from '@react-spring/web';

import './index.scss';

import type { MaskProps } from './interface';

import { clsPrefix } from '@/utils/constants';
import { useMounted } from '@/hooks/useMounted';

/**
 * @interface PotalProps
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
  const mounted = useMounted(true);

  const { opacity } = useSpring({
    opacity: mounted() && visible ? 1 : 0,
    config: transitionConfig,
  });

  // handlers
  function handleClick() {
    onTrigger && onTrigger(!visible);
  }

  return (
    <animated.div
      className={cls(`${clsPrefix}__mask`, userCls)}
      style={{ ...userStyle, opacity }}
      onClick={handleClick}
      {...restProps}
    />
  );
}
