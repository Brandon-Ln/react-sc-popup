import { Popup } from '@/Popup';
import { Fragment, useState } from 'react';

export function Left() {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(true);
  }

  return (
    <Fragment>
      <button onClick={handleClick}>Left</button>
      <Popup
        placement="left"
        visible={visible}
        width={200}
        height={200}
        onChange={(v) => setVisible(v)}
      >
        Hello world
      </Popup>
    </Fragment>
  );
}
