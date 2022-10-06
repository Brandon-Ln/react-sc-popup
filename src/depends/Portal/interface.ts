import type { ReactNode } from 'react';

export interface PotalProps {
  children: ReactNode;
  /**
   * 挂载节点的容器
   * @default document.body
   */
  container?: string | HTMLElement | (() => HTMLElement);
}
