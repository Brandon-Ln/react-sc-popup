import { useMemo } from 'react';

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
} from '../utils/constants';

export function useTransformStringByPlacement(placement: PopupPlacement) {
  return useMemo(() => {
    const transfromString: Record<'from' | 'enter' | 'leave', string> = {
      from: '',
      enter: '',
      leave: '',
    };
    switch (placement) {
      case 'center':
        transfromString.from = centerStartScale3d;
        transfromString.enter = centerEndScale3d;
        transfromString.leave = centerLeaveScale3d;
        break;
      case 'top':
        transfromString.from = topStartTransform;
        transfromString.enter = topEndTransform;
        transfromString.leave = topStartTransform;
        break;
      case 'bottom':
        transfromString.from = bottomStartTransform;
        transfromString.enter = bottomEndTransform;
        transfromString.leave = bottomStartTransform;
        break;
      case 'left':
        transfromString.from = leftStartTransform;
        transfromString.enter = leftEndTransform;
        transfromString.leave = leftStartTransform;
        break;
      case 'right':
        transfromString.from = rightStartTransform;
        transfromString.enter = rightEndTransform;
        transfromString.leave = rightStartTransform;
        break;
    }
    return transfromString;
  }, [placement]);
}
