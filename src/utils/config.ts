import { PopupPlacement } from '@/interface';
import {
  bottomEndTransform,
  bottomStartTransform,
  centerEndScale3d,
  centerLeaveScale3d,
  centerStartScale3d,
  leftEndTransform,
  leftStartTransform,
  rightEndTransform,
  rightStartTransform,
  topEndTransform,
  topStartTransform,
} from './constants';

function transitionValueFactory(
  startTransform: string,
  endTransform: string,
  leaveTransform = startTransform
) {
  return {
    from: { transform: startTransform },
    enter: { transform: endTransform },
    leave: { transform: leaveTransform },
  } as const;
}

export function getTransitionValueConfigByPlacement(placement: PopupPlacement) {
  switch (placement) {
    case 'center':
      return transitionValueFactory(centerStartScale3d, centerEndScale3d, centerLeaveScale3d);
    case 'top':
      return transitionValueFactory(topStartTransform, topEndTransform);
    case 'bottom':
      return transitionValueFactory(bottomStartTransform, bottomEndTransform);
    case 'left':
      return transitionValueFactory(leftStartTransform, leftEndTransform);
    case 'right':
      return transitionValueFactory(rightStartTransform, rightEndTransform);
  }
}
