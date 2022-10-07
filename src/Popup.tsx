import cls from 'classnames';
import { useSpring, animated, config } from '@react-spring/web';

import './popup.scss';

import type { PopupProps } from './interface';

import {
  clsPrefix,
  maskEndOpacity,
  maskStartOpacity,
  popupEndScale3d,
  popupStartScale3d,
} from '@/utils/constants';
import { useMounted } from '@/hooks/useMounted';
import { Portal } from './depends/Portal';
import { Mask } from './depends/Mask';
import { calculateSizeByPlacement } from './utils/layout';

/**
 * @interface PopupProps
 */
export function Popup(props: PopupProps) {
  const {
    className: userCls,
    style: userStyle,
    container,
    transitionConfig,
    visible,
    children,
    placement,
    preserve,
    width,
    height,
    onChange,
    ...restProps
  } = props;

  // hooks
  const mounted = useMounted(true);

  const { transform, opacity } = useSpring({
    transform: mounted() && visible ? popupEndScale3d : popupStartScale3d,
    opacity: mounted() && visible ? maskEndOpacity : maskStartOpacity,
    config: {
      ...config.wobbly,
      ...transitionConfig,
    },
  });

  // handlers
  //   function handleMaskTrigger() {}

  return (
    <Portal container={container}>
      {<Mask visible={visible} transitionConfig={transitionConfig} preserve={preserve} />}
      <div className={cls(`${clsPrefix}__popup`)}>
        <animated.div
          className={cls(
            `${clsPrefix}__popup__content`,
            {
              [`${clsPrefix}__popup__content--${placement}`]: true,
            },
            userCls
          )}
          style={{
            ...userStyle,
            ...calculateSizeByPlacement(placement, width, height),
            opacity,
            transform,
          }}
          {...restProps}
        >
          {children}
        </animated.div>
      </div>
    </Portal>
  );
}

Popup.defaultProps = {
  placement: 'center',
};
