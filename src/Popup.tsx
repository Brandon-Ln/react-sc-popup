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
import { useCustomEvent } from './hooks/useCustomEvent';
import { getAllInstanceSugars, mountSugar, unmountAllSugars } from './sugar';
import { MaskProps } from './depends/Mask/interface';
import { useTransformStringByPlacement } from './hooks/useTransformString';

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
    placement = 'center',
    preserve,
    preventMaskTrigger,
    withoutMask,
    detectSwipeVelocity = 3,
    disableDrag,
    disableSwipe,
    stopPropagation,
    preventDefault,
    width,
    height,
    onChange,
    onBeforeClose,
    onClosed,
    ...restProps
  } = props;

  // refs
  const hasSwipeRef = useRef(false);

  const springConfig: SpringConfig = {
    ...(placement === 'center' ? bounceDefaultTransitionConfig : {}),
    ...transitionConfig,
  };

  // drag gesture
  const [{ x: dragX, y: dragY }, dragApi] = useSpring(() => ({ x: 0, y: 0 }));
  const dragBinding = useDrag(
    ({ velocity, pressed, movement: [x, y], last, event }) => {
      if (placement === 'center') {
        return;
      }

      // behaves
      stopPropagation && event.stopPropagation();
      preventDefault && event.preventDefault();

      const currAxisVelocity =
        placement === 'bottom' || placement === 'top' ? velocity[1] : velocity[0];

      const triggerXPositiveDirection =
        (placement === 'left' && x < 0) || (placement === 'right' && x > 0);
      const triggerYPositiveDirection =
        (placement === 'bottom' && y > 1) || (placement === 'top' && y < -1);
      const triggerPositiveDirection = triggerXPositiveDirection || triggerYPositiveDirection;

      /**
       *  判断是否触发滑动手势
       */
      if (
        currAxisVelocity > Number(detectSwipeVelocity) &&
        !hasSwipeRef.current &&
        triggerPositiveDirection &&
        !disableSwipe
      ) {
        hasSwipeRef.current = true;
        onChange && onChange(false);
        /**
         * 还原拖动位置
         */
      } else if (last && !disableDrag) {
        dragApi.start({ x: 0, y: 0 });
        /**
         * 拖动手势
         */
      } else if (!disableDrag) {
        dragApi.start({
          x: triggerXPositiveDirection && pressed ? x : 0,
          y: triggerYPositiveDirection && pressed ? y : 0,
        });
      }
    },
    {
      enabled: placement !== 'center' || (!disableDrag && !disableSwipe),
      rubberband: true,
      filterTaps: true,
    }
  );

  const { from, leave, enter } = useTransformStringByPlacement(placement);

  const renderTransition = useTransition(visible, {
    from: { transform: from, display: '' },
    enter() {
      return async (next) => {
        await next({
          display: '',
        });
        return next({
          transform: enter,
        });
      };
    },
    leave() {
      return async (next) => {
        await next({
          transform: leave,
        });
        return next({
          display: preserve ? 'none' : '',
        });
      };
    },
    config: springConfig,
    /* 根据 preserve 字段决定渲染过渡方式 */
    expires: !preserve,
    onStart() {
      !visible && onBeforeClose && onBeforeClose();
    },
    onRest() {
      !visible && onClosed && onClosed();
    },
  });

  const { opacity } = useSpring({
    opacity: visible ? maskEndOpacity : maskStartOpacity,
  });

  // effects
  // reset hasSwipeRef Ref
  useEffect(() => {
    visible && (hasSwipeRef.current = false);
  }, [visible]);

  // handlers
  const handleMaskTrigger = useCustomEvent<MaskProps['onTrigger']>((value, e) => {
    preventDefault && e.preventDefault();
    stopPropagation && e.stopPropagation();
    !preventMaskTrigger && onChange && onChange(value);
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
      {renderTransition(({ display, transform }, visible) => {
        const inlineStyles = calculateSizeByPlacement(placement, width, height);
        return (
          visible && (
            <animated.div className={cls(`${clsPrefix}__popup`)} style={{ display }}>
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
                  ...inlineStyles,
                  transform,
                  opacity,
                  x: dragX,
                  y: dragY,
                }}
                {...dragBinding()}
                {...restProps}
              >
                {children}
              </animated.div>
            </animated.div>
          )
        );
      })}
    </Portal>
  );
}

// imperative sugar
Popup.mount = mountSugar;
Popup.unmountAll = unmountAllSugars;
Popup.getAllInstance = getAllInstanceSugars;
