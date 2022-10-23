import { useCallback, useEffect, useRef } from 'react';

export function usePreserveToggleElement(toggle: boolean) {
  const elRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef(toggle);

  // effects
  useEffect(() => {
    toggleRef.current = toggle;
  }, [toggle]);

  // handler
  const show = useCallback(() => {
    const element = elRef.current;
    if (toggleRef.current && element && element.style.display === 'none') {
      element.style.display = '';
    }
  }, []);

  const hide = useCallback(() => {
    const element = elRef.current;
    if (!toggleRef.current && element && !element.style.display) {
      element.style.display = 'none';
    }
  }, []);

  return {
    elRef,
    show,
    hide,
  };
}
