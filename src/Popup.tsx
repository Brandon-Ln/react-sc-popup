import cls from 'classnames';
import { useMemo } from 'react';
import { useSpring, animated, useTransition, SpringConfig } from '@react-spring/web';

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
    width,
    height,
    onChange,
    onBeforeClose,
    onClosed,
    ...restProps
  } = props;

  // hooks
  const { elRef, show, hide } = usePreserveToggleElement(visible || false);

  const springConfig: SpringConfig = {
    ...(placement === 'center' ? bounceDefaultTransitionConfig : {}),
    ...transitionConfig,
  };

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

  // handlers
  const handleMaskTrigger = useCustomEvent(() => {
    !preventMaskTrigger && onChange && onChange(false);
  });

  // elements
  const renderMask = useMemo(
    () => (
      <Mask
        visible={visible}
        transitionConfig={transitionConfig}
        onTrigger={handleMaskTrigger}
        className={maskClassName}
        style={maskStyle}
      />
    ),
    [handleMaskTrigger, maskClassName, maskStyle, visible, transitionConfig]
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
          )
        );
      })}
    </Portal>
  );
}

Popup.defaultProps = {
  placement: 'center',
};

// imperative sugar
Popup.mount = mountSugar;
Popup.unmountAll = unmountAllSugars;
Popup.getAllInstance = getAllInstanceSugars;
