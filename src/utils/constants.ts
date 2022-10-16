import type { SpringConfig } from '@react-spring/web';

export const inBrowser =
  typeof window === 'object' && window && typeof window.document === 'object';

export const clsPrefix = 'bl';

export const maskStartOpacity = 0;
export const maskEndOpacity = 1;

export const centerStartScale3d = 'scale3d(0.7, 0.7, 0.7)';
export const centerEndScale3d = 'scale3d(1, 1, 1)';
export const bottomStartTransform = 'translate3d(0, 100%, 0)';
export const bottomEndTransform = 'translate3d(0, 0%, 0)';
export const leftStartTransform = 'translate3d(-100%, 0, 0)';
export const leftEndTransform = 'translate3d(0%, 0, 0)';
export const rightStartTransform = 'translate3d(100%, 0, 0)';
export const rightEndTransform = 'translate3d(0%, 0, 0)';
export const topStartTransform = 'translate3d(0, -100%, 0)';
export const topEndTransform = 'translate3d(0, 0%, 0)';

export const bounceDefaultTransitionConfig: SpringConfig = {
  tension: 600,
  friction: 15,
};
