import { Popup } from '@/Popup';
import { Fragment } from 'react';

export function AdjustSwipeVelocityDemo() {
  return (
    <Fragment>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                velocity-1.5
              </div>
            ),
            height: 300,
            placement: 'bottom',
            disableDrag: true,
            detectSwipeVelocity: 1.5,
          });
        }}
      >
        velocity-1.5: Easy to swipe
      </button>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                velocity-8
              </div>
            ),
            height: 300,
            placement: 'bottom',
            disableDrag: true,
            detectSwipeVelocity: 8,
          });
        }}
      >
        velocity-8: Maybe hard to swipe
      </button>
    </Fragment>
  );
}
