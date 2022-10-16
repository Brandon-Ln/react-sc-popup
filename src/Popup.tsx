import cls from 'classnames';
import { useSpring, animated, useTransition, SpringConfig } from '@react-spring/web';

import './Popup.scss';

import type { PopupProps } from './interface';

import {
  clsPrefix,
  maskEndOpacity,
  maskStartOpacity,
  popupEndScale3d,
  popupStartScale3d,
  transformDefaultTransitionConfig,
} from '@/utils/constants';
import { useMounted } from '@/hooks/useMounted';
import { Portal } from './depends/Portal';
import { Mask } from './depends/Mask';
import { calculateSizeByPlacement } from './utils/layout';
import { useMergeControll } from './hooks/useMergeControll';
import { usePreserveToggleElement } from './hooks/usePreserveToggleElement';
import { useMemo } from 'react';
import { useCustomEvent } from './hooks/useCustomEvent';

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
  const mounted = useMounted(true);

  const [mergeVisible, setMergeVisible] = useMergeControll(visible, onChange, false);

  const { elRef, show, hide } = usePreserveToggleElement(mergeVisible);

  const springConfig: SpringConfig = {
    ...transformDefaultTransitionConfig,
    ...transitionConfig,
  };

  const { transform } = useSpring({
    transform: mounted() && mergeVisible ? popupEndScale3d : popupStartScale3d,
    config: springConfig,
    onStart: show,
    onRest: hide,
  });

  const renderTransition = useTransition(mergeVisible, {
    from: { transform: popupStartScale3d },
    enter: { transform: popupEndScale3d },
    leave: { transform: popupStartScale3d },
    config: springConfig,
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
      {/* 根据 preserve 字段决定渲染过渡方式 */}
      {preserve ? (
        <div className={cls(`${clsPrefix}__popup`)} ref={elRef} style={{ display: 'none' }}>
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
      ) : (
        renderTransition(({ transform }, visible) => {
          return (
            visible && (
              <div className={cls(`${clsPrefix}__popup`)}>
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
        })
      )}
    </Portal>
  );
}

Popup.defaultProps = {
  placement: 'center',
};
