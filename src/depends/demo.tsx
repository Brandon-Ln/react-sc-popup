import type { DemoProps } from './interface';

export function DemoComponents(props: DemoProps) {
  const { children = '', logMessage } = props;

  console.count(logMessage);

  return <div>{children}</div>;
}
