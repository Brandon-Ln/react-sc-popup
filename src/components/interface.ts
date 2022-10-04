import type { ReactNode } from 'react';

/**
 * @interface Demo
 */
export interface DemoProps {
  /**
   * @requires
   */
  logMessage: string;
  /**
   * @default ''
   */
  children?: ReactNode;
}
