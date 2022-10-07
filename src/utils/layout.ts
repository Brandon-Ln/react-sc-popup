import { CSSProperties } from 'react';

import type { PopupPlacement, PopupProps } from '@/interface';

export function calculateSizeByPlacement(
  placement?: PopupPlacement,
  width?: PopupProps['width'],
  height?: PopupProps['height']
): CSSProperties {
  if (placement === 'center') {
    return {
      width,
      height,
    };
  } else if (placement === 'bottom' || placement === 'top') {
    return { height };
  } else {
    return { width };
  }
}
