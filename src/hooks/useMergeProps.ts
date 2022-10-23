import { useMemo } from 'react';

export function useMergeProps<P extends object>(userProps: P, defaultProps: P) {
  return useMemo(() => {
    return { ...defaultProps, ...userProps };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(userProps), ...Object.values(defaultProps)]);
}
