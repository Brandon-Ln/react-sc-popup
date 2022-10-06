import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import type { PotalProps } from './interface';

function getRealElement(container: PotalProps['container']) {
  let element: Element | undefined;
  if (typeof container === 'string') {
    element = document.querySelector(container) || undefined;
  } else if (container instanceof HTMLElement) {
    element = container;
  } else if (typeof container === 'function') {
    element = container();
  }
  return element || document.body;
}

/**
 * @interface PotalProps
 */
export const Portal = forwardRef<{ root: Element }, PotalProps>((props, ref) => {
  const { container, children } = props;

  const domNodeRef = useRef<Element>(getRealElement(container));

  useImperativeHandle(
    ref,
    () => ({
      root: domNodeRef.current,
    }),
    []
  );

  return createPortal(children, domNodeRef.current);
});

Portal.displayName = 'Portal';
