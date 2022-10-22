import { Popup } from '@/Popup';
import { Fragment, useState } from 'react';

export function Top() {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(true);
  }

  return (
    <Fragment>
      <button onClick={handleClick}>Top</button>
      <Popup
        placement="top"
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
