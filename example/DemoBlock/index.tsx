import type { DemoBlockProps } from './interface';

export function DemoBlock(props: DemoBlockProps) {
  const { title, children } = props;
  return (
    <div style={{ margin: 12 }}>
      <div style={{ textAlign: 'left', paddingBottom: 4 }}>{title}: </div>
      <div>{children}</div>
    </div>
  );
}
