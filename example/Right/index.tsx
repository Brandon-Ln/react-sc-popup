import { Popup } from '@/Popup';
import { Fragment, useState } from 'react';

export function Right() {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(true);
  }

  return (
    <Fragment>
      <button onClick={handleClick}>Right</button>
      <Popup
        placement="right"
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
