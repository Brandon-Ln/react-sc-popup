import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import styleModules from './entry.module.scss';

import { Center } from './Center';
import { Right } from './Right';
import { Left } from './Left';
import { Bottom } from './Bottom';
import { Top } from './Top';
import { DemoBlock } from './DemoBlock';
import { ControlledAndUnControlled } from './CAU/CAU';
import { WithoutMaskExample } from './WM';

function Examples() {
  return (
    <div className={styleModules.demo}>
      <DemoBlock title="1. placement">
        <Left />
        <Right />
        <Top />
        <Bottom />
        <Center />
      </DemoBlock>
      <DemoBlock title="2. Controll and UnControlled">
        <ControlledAndUnControlled />
      </DemoBlock>
      <DemoBlock title="3. Without Mask">
        <WithoutMaskExample />
      </DemoBlock>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Examples />
  </StrictMode>
);
