import { Popup } from '@/Popup';
import { Fragment } from 'react';

export function WithoutMaskExample() {
  return (
    <Fragment>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                Close
              </div>
            ),
            width: 300,
            height: 300,
            withoutMask: true,
          });
        }}
      >
        Without Mask style1
      </button>
      <button
        onClick={() => {
          const inst = Popup.mount({
            children: (
              <div onClick={() => inst.unmount()} style={{ cursor: 'pointer' }}>
                Close
              </div>
            ),
            width: 200,
            height: 200,
            placement: 'bottom',
            withoutMask: true,
          });
        }}
      >
        Without Mask style2
      </button>
    </Fragment>
  );
}
