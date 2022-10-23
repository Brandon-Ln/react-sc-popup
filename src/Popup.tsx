import cls from 'classnames';
import { useEffect, useMemo, useRef } from 'react';
import { useSpring, animated, useTransition, SpringConfig } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import './Popup.scss';

import type { PopupProps } from './interface';

import {
  clsPrefix,
  maskEndOpacity,
  maskStartOpacity,
  bounceDefaultTransitionConfig,
} from '@/utils/constants';
import { Portal } from './depends/Portal';
import { Mask } from './depends/Mask';
import { calculateSizeByPlacement } from './utils/layout';
import { usePreserveToggleElement } from './hooks/usePreserveToggleElement';
import { useCustomEvent } from './hooks/useCustomEvent';
import { getTransitionValueConfigByPlacement } from './utils/config';
import { getAllInstanceSugars, mountSugar, unmountAllSugars } from './sugar';

/**
 * @interface PopupProps
 */
export function Popup(props: PopupProps) {
  const {
    className: userCls,
    style: userStyle,
    maskClassName,
    maskStyle,
    container,
    transitionConfig,
    visible,
    children,
    placement,
    preserve,
    preventMaskTrigger,
    withoutMask,
    detectSwiperVelocity,
    disableDrag,
    disableSwipe,
    width,
    height,
    onChange,
    onBeforeClose,
    onClosed,
    ...restProps
  } = props;

  // refs
  const hasSwipe = useRef(false);

  // hooks
  const { elRef, show, hide } = usePreserveToggleElement(visible || false);

  const springConfig: SpringConfig = {
    ...(placement === 'center' ? bounceDefaultTransitionConfig : {}),
    ...transitionConfig,
  };

  // drag gesture
  const [{ x: dragX, y: dragY }, dragSet] = useSpring(() => ({ x: 0, y: 0 }));
  const dragBinding = useDrag(
    ({ direction, velocity, pressed, movement: [x, y], last }) => {
      if (placement === 'center') {
        return;
      }
      const currAxisVelocity =
        placement === 'bottom' || placement === 'top' ? velocity[1] : velocity[0];
      const triggerXPositiveDirection =
        (placement === 'left' && direction[0] === -1) ||
        (placement === 'right' && direction[0] === 1);
      const triggerYPositiveDirection =
        (placement === 'bottom' && direction[1] === 1) ||
        (placement === 'top' && direction[1] === -1);
      const triggerPositiveDirection = triggerXPositiveDirection || triggerYPositiveDirection;
      if (
        currAxisVelocity > Number(detectSwiperVelocity) &&
        !hasSwipe.current &&
        triggerPositiveDirection &&
        !disableSwipe
      ) {
        hasSwipe.current = true;
        onChange && onChange(false);
      } else if (last && !disableDrag) {
        dragSet({ x: 0, y: 0 });
      } else if (!disableDrag) {
        dragSet({
          x: triggerXPositiveDirection && pressed ? x : 0,
          y: triggerYPositiveDirection && pressed ? y : 0,
        });
      }
    },
    {
      enabled: placement !== 'center' || (disableDrag && disableSwipe),
      rubberband: true,
    }
  );

  const renderTransition = useTransition(visible, {
    ...getTransitionValueConfigByPlacement(placement!),
    config: springConfig,
    /* 根据 preserve 字段决定渲染过渡方式 */
    expires: !preserve,
    onStart() {
      !visible && onBeforeClose && onBeforeClose();
      show();
    },
    onRest() {
      hide();
      !visible && onClosed && onClosed();
    },
  });

  const { opacity } = useSpring({
    opacity: visible ? maskEndOpacity : maskStartOpacity,
  });

  // effects
  // reset hasSwipe Ref
  useEffect(() => {
    visible && (hasSwipe.current = false);
  }, [visible]);

  // handlers
  const handleMaskTrigger = useCustomEvent(() => {
    !preventMaskTrigger && onChange && onChange(false);
  });

  // elements
  const renderMask = useMemo(
    () =>
      !withoutMask && (
        <Mask
          visible={visible}
          transitionConfig={transitionConfig}
          onTrigger={handleMaskTrigger}
          className={maskClassName}
          style={maskStyle}
        />
      ),
    [withoutMask, visible, transitionConfig, handleMaskTrigger, maskClassName, maskStyle]
  );

  return (
    <Portal container={container}>
      {renderTransition(({ transform }, visible) => {
        return (
          visible && (
            <div className={cls(`${clsPrefix}__popup`)} ref={elRef}>
              {renderMask}
              <animated.div
                className={cls(
                  `${clsPrefix}__popup__content`,
                  {
                    [`${clsPrefix}__popup__content--${placement}`]: true,
                    [`${clsPrefix}__popup__content--shadow`]: withoutMask,
                  },
                  userCls
                )}
                style={{
                  ...userStyle,
                  ...calculateSizeByPlacement(placement, width, height),
                  opacity,
                  x: dragX,
                  y: dragY,
                  transform,
                }}
                {...dragBinding()}
                {...restProps}
              >
                {children}
              </animated.div>
            </div>
          )
        );
      })}
    </Portal>
  );
}

Popup.defaultProps = {
  placement: 'center',
  detectSwiperVelocity: 3,
};

// imperative sugar
Popup.mount = mountSugar;
Popup.unmountAll = unmountAllSugars;
Popup.getAllInstance = getAllInstanceSugars;
