import { useEffect, useRef } from "react";

export function useDebounceEffect(
  cb: any,
  deps: any[] = [],
  delay: number = 500
) {
  const timeout = useRef<any>(null);
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      cb();
    }, delay);
    return () => {
      clearTimeout(timeout.current);
    };
  }, deps);
}

export function useDebounceCallback<T>(value: T, delay: number = 500) {
  const timeout = useRef<any>(null);
  const callback = useRef<any>(() => {});
  callback.current = value;
  return (...args: any[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback.current(...args);
    }, delay);
  };
}
