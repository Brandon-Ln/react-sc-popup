import { Popup } from '@/Popup';
import { Fragment, useState } from 'react';

export function NestingDemo() {
  const [visible1, setvisible1] = useState(false);

  const [visible2, setvisible2] = useState(false);

  const [visible3, setvisible3] = useState(false);

  return (
    <Fragment>
      <button onClick={() => setvisible1(true)}>Open First Popup</button>
      <Popup
        visible={visible1}
        placement="right"
        width={200}
        height={200}
        onChange={(v) => setvisible1(v)}
      >
        <button onClick={() => setvisible2(true)}>Open Secord Popup</button>
      </Popup>
      <Popup
        visible={visible2}
        placement="left"
        width={300}
        height={300}
        onChange={(v) => setvisible2(v)}
      >
        <button
          onClick={() => {
            console.log('onclick');
            setvisible3(true);
          }}
        >
          Open Third Popup
        </button>
      </Popup>
      <Popup visible={visible3} width={300} height={300} onChange={(v) => setvisible3(v)}>
        Third Popup
      </Popup>
    </Fragment>
  );
}
