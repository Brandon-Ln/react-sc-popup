import { useRef } from 'react';

export function usePreserveElement() {
  const elRef = useRef<HTMLDivElement>(null);

  return {
    elRef,
    show() {
      const element = elRef.current;
      if (element && element.style.display === 'none') {
        element.style.display = '';
      }
    },
    hide() {
      const element = elRef.current;
      if (element && element.style.display) {
        element.style.display = 'none';
      }
    },
  };
}
