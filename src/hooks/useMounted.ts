import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 设置组件挂载状态的 hook
 * @param updatedWhenMounted 挂载后是否重新触发组件更新
 */
export function useMounted(updatedWhenMounted?: boolean) {
  const mounted = useRef(false);
  const [, setMountedState] = useState(false);

  useEffect(() => {
    mounted.current = true;
    updatedWhenMounted && setMountedState(true);

    return () => {
      mounted.current = false;
    };
  }, [updatedWhenMounted]);

  return useCallback(() => mounted.current, []);
}
