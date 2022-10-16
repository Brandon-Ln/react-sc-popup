import { useCallback, useRef } from 'react';

export function usePreserveToggleElement(toggle: boolean) {
  const elRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    const element = elRef.current;
    if (toggle && element && element.style.display === 'none') {
      element.style.display = '';
    }
  }, [toggle]);

  const hide = useCallback(() => {
    const element = elRef.current;
    if (!toggle && element && !element.style.display) {
      element.style.display = 'none';
    }
  }, [toggle]);

  return {
    elRef,
    show,
    hide,
  };
}
