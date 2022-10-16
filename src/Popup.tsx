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
import { useMounted } from '@/hooks/useMounted';
import { Portal } from './depends/Portal';
import { Mask } from './depends/Mask';
import { calculateSizeByPlacement } from './utils/layout';
import { useMergeControll } from './hooks/useMergeControll';
import { usePreserveToggleElement } from './hooks/usePreserveToggleElement';
import { useCustomEvent } from './hooks/useCustomEvent';
import { getTransitionValueConfigByPlacement } from './utils/config';

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
    width,
    height,
    onChange,
    ...restProps
  } = props;

  // hooks
  const mounted = useMounted();

  const [mergeVisible, setMergeVisible] = useMergeControll(visible, onChange, false);

  const { elRef, show, hide } = usePreserveToggleElement(mergeVisible);

  const springConfig: SpringConfig = {
    ...(placement === 'center' ? bounceDefaultTransitionConfig : {}),
    ...transitionConfig,
  };

  const renderTransition = useTransition(mergeVisible, {
    ...getTransitionValueConfigByPlacement(placement!),
    config: springConfig,
    /* 根据 preserve 字段决定渲染过渡方式 */
    expires: !preserve,
    onStart: show,
    onRest: hide,
  });

  const { opacity } = useSpring({
    opacity: mounted() && mergeVisible ? maskEndOpacity : maskStartOpacity,
  });

  // handlers
  const handleMaskTrigger = useCustomEvent(() => {
    setMergeVisible(false);
  });

  // elements
  const renderMask = useMemo(
    () => (
      <Mask
        visible={mergeVisible}
        transitionConfig={transitionConfig}
        onTrigger={handleMaskTrigger}
        className={maskClassName}
        style={maskStyle}
      />
    ),
    [handleMaskTrigger, maskClassName, maskStyle, mergeVisible, transitionConfig]
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
