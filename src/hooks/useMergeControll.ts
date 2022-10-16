/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { useCustomEvent } from './useCustomEvent';

function noop() {}

type ChangeEventHandler<T, Args extends any[]> = (value: T, ...args: Args) => void;

/**
 * 使用混合受控模式的通用 hook
 * @param value 受控值
 * @param onChange 值变更处理函数
 * @param defaultValue 默认值
 */
export function useMergeControll<T, RestArgs extends any[]>(
  value: T | undefined,
  onChange: ChangeEventHandler<T, RestArgs> | undefined,
  defaultValue: T
): [T, ChangeEventHandler<T, RestArgs>] {
  const [innerState, setInnerState] = useState(defaultValue);

  // 处理内部值变更的函数
  const handleChange = useCustomEvent<ChangeEventHandler<T, RestArgs>>((newValue, ...restArgs) => {
    setInnerState(newValue);
    onChange && onChange(newValue, ...restArgs);
  });

  // 根据是否是受控模式来返回对应的事件处理函数
  if (typeof value === 'undefined') {
    return [innerState, handleChange];
  } else {
    return [value, onChange || noop];
  }
}
