import { Popup } from '@/Popup';
import { Fragment } from 'react';

export function BannedGestureDemo() {
  return (
    <Fragment>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                Disabled Swipe--Close
              </div>
            ),
            width: 300,
            height: 300,
            placement: 'left',
            disableSwipe: true,
          });
        }}
      >
        Disabled Swipe
      </button>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                Disabled Drag--Close
              </div>
            ),
            width: 200,
            height: 200,
            placement: 'bottom',
            disableDrag: true,
          });
        }}
      >
        Disabled Drag
      </button>
    </Fragment>
  );
}
