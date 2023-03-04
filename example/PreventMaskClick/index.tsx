import { Fragment, useState } from 'react';

import { Popup } from '@/Popup';

export function PreventMaskClickDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <button onClick={() => setVisible(true)}>Open Popup that mask do not respond</button>
      <Popup visible={visible} preventMaskTrigger width={300} height={300}>
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          Close Current Popup
        </button>
      </Popup>
    </Fragment>
  );
}
