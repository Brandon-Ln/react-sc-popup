import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import styleModules from './entry.module.scss';

import { Center } from './Center';
import { Right } from './Right';
import { Left } from './Left';
import { Bottom } from './Bottom';
import { Top } from './Top';

function Examples() {
  return (
    <div className={styleModules.demo}>
      <Left />
      <Right />
      <Top />
      <Bottom />
      <Center />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Examples />
  </StrictMode>
);
