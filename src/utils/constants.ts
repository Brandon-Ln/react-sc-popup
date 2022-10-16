import type { SpringConfig } from '@react-spring/web';

export const clsPrefix = 'bl';

export const maskStartOpacity = 0;
export const maskEndOpacity = 1;

export const popupStartScale3d = 'scale3d(0.7, 0.7, 0.7)';
export const popupEndScale3d = 'scale3d(1, 1, 1)';

export const transformDefaultTransitionConfig: SpringConfig = {
  tension: 600,
  friction: 15,
};
