import { useCallback, useEffect, useInsertionEffect, useLayoutEffect, useRef } from 'react';

import type { Fn, FnWithoutThis } from '@/utils/types';
import { inBrowser } from '@/utils/constants';

const updateRefEffect =
  inBrowser && typeof useInsertionEffect === 'function'
    ? useInsertionEffect
    : inBrowser
    ? useLayoutEffect
    : useEffect;

/**
 * 使用自定义事件
 * @param callback 事件回调函数
 * @returns stableEventCallback
 */
export function useCustomEvent<T extends Fn>(callback: T): FnWithoutThis<T> {
  const callbackRef = useRef(callback);

  updateRefEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current.apply(null, args);
  }, []);
}
