import { Popup } from '@/Popup';

import { Fragment, useState } from 'react';

export function ControlledAndUnControlled() {
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => {
          Popup.mount({ children: 'Hello world', width: 300, height: 300 });
        }}
      >
        Untrolled Mode
      </button>
      <button onClick={() => setVisible(true)}>Controlled</button>
      <Popup width={300} height={300} visible={visible} onChange={(v) => setVisible(v)}>
        Controll Mode
      </Popup>
    </Fragment>
  );
}
