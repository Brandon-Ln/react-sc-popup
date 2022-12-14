import { Fragment, useState } from 'react';

import { Popup } from '@/Popup';

export function Center() {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <Fragment>
      <button onClick={handleClick}>Center</button>
      <Popup
        placement="center"
        preserve
        visible={visible}
        width={200}
        height={200}
        onChange={(v) => {
          setVisible(v);
        }}
      >
        Hello world
      </Popup>
    </Fragment>
  );
}
