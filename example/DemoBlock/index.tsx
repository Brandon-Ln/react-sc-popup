import { DemoBlockProps } from './interface';

export function DemoBlock(props: DemoBlockProps) {
  const { title, children } = props;
  return (
    <div>
      <div style={{ textAlign: 'left' }}>{title}: </div>
      <div>{children}</div>
    </div>
  );
}
