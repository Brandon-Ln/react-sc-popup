import { createRoot } from 'react-dom/client';
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
import { NestingDemo } from './Nesting';
import { BannedGestureDemo } from './BannedGesture';
import { AdjustSwipeVelocityDemo } from './SwipeVelocity';
import { PreventMaskClickDemo } from './PreventMaskClick';

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
      <DemoBlock title="2. Controlled and Uncontrolled Mode">
        <ControlledAndUnControlled />
      </DemoBlock>
      <DemoBlock title="3. Without Mask">
        <WithoutMaskExample />
      </DemoBlock>
      <DemoBlock title="4. Nesting Scene">
        <NestingDemo />
      </DemoBlock>
      <DemoBlock title="5. adjust detect swiper velocity">
        <AdjustSwipeVelocityDemo />
      </DemoBlock>
      <DemoBlock title="6. Ban gesture">
        <BannedGestureDemo />
      </DemoBlock>
      <DemoBlock title="7. Prevent mask click trigges toggle">
        <PreventMaskClickDemo />
      </DemoBlock>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Examples />
  </StrictMode>
);
